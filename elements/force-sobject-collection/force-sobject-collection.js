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
        properties: _.extend({

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
                    return collection;
                },
                notify: true
            }
        }, viewProps),
        observers: [
            "reset(sobject, query, querytype)"
        ],
        
        /**
         * Replaces all the existing contents of the collection and initiates autosync if enabled.
         *
         * @method reset
         */
        reset: function() {
            this.collection.config = generateConfig(_.pick(this, _.keys(viewProps)));
            this.collection.reset();
            if (this.autosync) this.fetch();
        },

        /**
         * Initiates the fetching of records from the relevant data store (server/offline store).
         *
         * @method fetch
         */
        fetch: function() {

            var onFetch = function() {
                if ((this.maxsize < 0 || this.maxsize > this.collection.length)
                    && this.collection.hasMore())
                    this.collection.getMore().then(onFetch);
            }.bind(this);

            var operation = function() {
                var collection = this.collection;
                var store = this.$.store;

                if (collection.config) {
                    // Define the collection model type. Set the idAttribute to 'ExternalId' if sobject is external object.
                    collection.model = Force.SObject.extend({
                        idAttribute: this.sobject.toLowerCase().search(/__x$/) > 0 ? 'ExternalId' : 'Id'
                    });
                    $.when(store.cacheReady, SFDC.launcher)
                    .done(function() {
                        collection.cache = store.cache;
                        collection.cacheForOriginals = store.cacheForOriginals;
                        collection.fetch({ reset: true, success: onFetch });
                    });
                }
            }.bind(this);

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation);
        }
    });

})(window.SFDC);
