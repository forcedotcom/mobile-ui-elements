(function(SFDC) {

    "use strict";

    var viewProps = {

        /**
         * (Required) Name of Salesforce sobject against which fetch operations will be performed.
         *
         * @attribute sobject
         * @type String
         */
        sobject: String,

        /**
         * (Optional) SOQL/SOSL/SmartSQL statement to fetch the records. Required when querytype is soql, sosl or cache.
         *
         * @attribute query
         * @type String
         * @default null
         */
        query: {
            type: String,
            value: null
        },

        /**
         * (Optional) Type of query (mru, soql, sosl, cache). Required if query attribute is specified.
         *
         * @attribute querytype
         * @type String
         * @default mru
         */
        querytype: {
            type: String,
            value: "mru"
        },

        /**
         * (Optional) Auto synchronize (fetch/save) changes to the model with the remote server/local store. If false, use fetch/save methods to commit changes to server or local store.
         *
         * @attribute autosync
         * @type Boolean
         * @default false
         */
        autosync: Boolean,

        /**
         * (Optional) If positive, limits the maximum number of records fetched.
         *
         * @attribute maxsize
         * @type Number
         * @default -1
         */
        maxsize: {
            type: Number,
            value: -1
        }
    };

    var generateConfig = function(props) {
        var config = {};

        // Fetch if only sobject type is specified.
        if (props.sobject && typeof props.sobject === 'string') {
            config.sobjectType = props.sobject;
            // Is device offline and smartstore is available
            if (!SFDC.isOnline() && navigator.smartstore) {
                // Only run cache queries. If none provided, fetch all data.
                config.type = 'cache';
                if (props.querytype == 'cache' && props.query) config.cacheQuery = props.query;
                else config.cacheQuery = navigator.smartstore.buildAllQuerySpec('attributes.type');
            } 
            /* Query must be specified if Querytype is not mru */
            else if (props.querytype == 'mru' || (props.querytype && props.query)) {

                // Send the user config for fetch
                config.type = props.querytype;
                if (props.querytype == 'cache') config.cacheQuery = props.query;
                else config.query = props.query;
            }
        }
        return (config.type) ? config : null;
    }

    //TBD: Make collection a private property. Then expose sobjects property which contains the array of models wrapped into SObjectViewModel.
    Polymer({
        is: 'force-sobject-collection', 

        /**
         * Fired when the collection's entire contents have been replaced.
         *
         * @event reset
         */

        /**
         * Fired when the data has been successfully synced with the server.
         *
         * @event sync
         */

        /**
         * Fired when a request to remote server has failed.
         *
         * @event error
         */

        properties: _.extend({

            /**
             * (Optional) A Promise that returns an instance of force-sobject-store on cache ready completion.
             * It is required to add offline capability to the component.
             *
             * @attribute cachePromise
             * @type Object
             */
            cachePromise: Object,
            
            /**
             * Returns an instance of Force.SObjectCollection containing the list of records fetched by the query.
             *
             * @attribute collection
             * @type Object
             */
            collection: {
                type: Object,
                value: function() {
                    var collection = new Force.SObjectCollection();
                    collection.on('all', function(event) {
                        this.fire(event);
                    }.bind(this));
                    this.resetCount = 0;
                    return collection;
                },
                notify: true
            }
        }, viewProps),
        observers: [
            'reset(sobject, query, querytype, collection)'
        ],
        
        /**
         * Replaces all the existing contents of the collection and initiates autosync if enabled.
         *
         * @method reset
         */
        reset: function(sobject, query, querytype, collection) {
            this.collection.config = generateConfig(_.pick(this, _.keys(viewProps)));
            this.collection.reset();
            this.resetCount++;
            if (this.autosync) this.fetch();
        },
        
        /**
         * Initiates the fetching of more records if there's an available cursor and the collection size is less than maxsize.
         *
         * @method fetchMore
         */
        fetchMore: function() {
            var that = this;
            if ((this.maxsize < 0 || this.maxsize > this.collection.size())
                && this.collection.hasMore()) 
                return this.collection.getMore()
                    .then(function() {
                        that.fire('sync');
                    });
        },

        /**
         * Initiates the fetching of records from the relevant data store (server/offline store).
         *
         * @method fetch
         */
        fetch: function() {
            var collection = this.collection;
            var resetCount = this.resetCount; // captured for closure below

            var onFetch = function() {
                if (this.resetCount > resetCount) {
                    // This is an old query -- ignore
                    return;
                }

                if (collection.length == 0) {
                    // Nothing came back 
                    return;
                }
            }.bind(this);

            var operation = function() {
                var that = this;
                
                if (collection.config) {
                    // Define the collection model type. Set the idAttribute to 'ExternalId' if sobject is external object.
                    collection.model = Force.SObject.extend({
                        idAttribute: that.sobject.toLowerCase().search(/__x$/) > 0 ? 'ExternalId' : 'Id'
                    });
                    
                    var promise = Promise.resolve(SFDC.launcher)
                        .then(function() {
                            if (that.cachePromise) {
                                return that.cachePromise.then(function(store) {
                                    collection.cache = store.cache;
                                    collection.cacheForOriginals = store.cacheForOriginals;
                                });
                            }
                        });

                    promise.then(function() {
                        collection.fetch({ reset: true, success: onFetch });
                    });
                }
            }.bind(this);

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation);
        }
    });

})(window.SFDC);
