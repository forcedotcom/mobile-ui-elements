(function(SFDC) {

    var createModel = function(sobject) {
        sobject = sobject.toLowerCase();

        return new (Force.SObject.extend({
            sobjectType: sobject.toLowerCase(),
            idAttribute: sobject.search(/__x$/) > 0 ? 'ExternalId' : 'Id'
        }));
    }

    var SObjectViewModel = function(model) {
        var _self = this;

        var setupProps = function(props) {
            props.forEach(function(prop) {
                Object.defineProperty(_self, prop, {
                    get: function() {
                        return model.get(prop);
                    },
                    set: function(val) {
                        model.set(prop, val);
                    },
                    enumerable: true
                });
            });
        }
        // Review all fields in fieldlist to pick the first part of the reference fields. 
        // eg. for "Owner.Name" pick "Owner"
        var addFields = _.map(model.fieldlist, function(prop) { return prop.split('.')[0]; });
        // Create object map
        setupProps(_.union(_.keys(model.attributes), addFields));

        // Setup an event listener to update object map when fieldlist changes on model
        model.on('change', function() {
            setupProps(_.difference(_.keys(model.attributes), _.keys(_self)));
        });
    }

    function processFieldlist(fieldlist) {
        if (typeof fieldlist === 'string')
            return fieldlist.trim().split(/\s+/);
        else
            return fieldlist;
    }

    Polymer({
        is: 'force-sobject', 
        properties: {
            /**
             * (Required) Name of Salesforce sobject against which CRUD operations will be performed.
             *
             * @attribute sobject
             * @type String
             */
            sobject: String,

            /**
             * (Required) Id of the record on which CRUD operations will be performed.
             *
             * @attribute recordid
             * @type String
             */
            recordid: String,

            /**
             * (Optional) List of field names that need to be fetched for the record. 
             * Provide a space delimited list. Also the field names are case sensitive.
             *
             * @attribute fieldlist
             * @type String
             * @default All fields
             */
            fieldlist: {
                type: String,
                value: null
            },

            /**
             * (Optional) Auto synchronize (fetch/save) changes to the model with the remote server/local store. 
             * If false, use fetch/save methods to commit changes to server or local store. (TBD: autosync not working for "save" operations)
             *
             * @attribute autosync
             * @type Boolean
             * @default false
             */
            autosync: String,

            /**
             * (Optional) The cache mode (server-first, server-only, cache-first, cache-only) to use during CRUD operations.
             *
             * @attribute cachemode
             * @type String
             * @default SFDC.cacheMode()
             */
            cachemode: {
                type: String,
                value: function() { return SFDC.cacheMode(); }
            },

            /**
             * (Optional) The merge mode to use when saving record changes to salesforce.
             *
             * @attribute mergemode
             * @type String
             * @default Force.MERGE_MODE.OVERWRITE
             */
            mergemode: {
                type: String,
                value: Force.MERGE_MODE.OVERWRITE
            },

            /**
             * Returns a map of fields to values for a specified record. Update this map to change SObject field values.
             *
             * @attribute fields
             * @type Object
             */
            fields: {
                type: Object,
                notify: true
            }
        },

        observers: [
            "_init(sobject, recordid, fieldlist)",
            "_updateCacheMode(cachemode)"
        ],
        
        /**
         * Initiate the fetching of record data from the relevant data store (server/offline store).
         *
         * @method fetch
         */
        fetch: function(opts) {

            var operation = function() {
                var model = this._model;
                if (model && model.id) {
                    this._whenModelReady().then(function() {
                        model.fetch(opts);
                    });
                } else if (!this.autosync) {
                    //if sync was not auto initiated, trigger a 'invalid' event
                    this.fire('invalid', 'sobject Type and recordid required for fetch.');
                }
            }
            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        },

        /**
         * Initiate the saving of record data to the relevant data store (server/offline store).
         * If the model was modified locally, it saves all the updateable fields on the sobject back to server. 
         * If fieldlist property is specified on the options, only the specified fields are included during the save operation.
         *
         * @method save
         */
        save: function(options) {
            var timingtag = Date.now() + ':force-sobject:save:' + this.id;
            console.time(timingtag);
            console.log(timingtag);
            console.log(JSON.stringify(this.fields));
            console.trace();
            
            var operation = function() {
                var that = this,
                    model = that._model,
                    changedAttributes = this._changedAttributes;

                options = _.extend({ mergeMode: this.mergemode }, options);

                var successCB = options.success;
                options.success = function() {
                    that.recordid = model.id;
                    that.fire('save');
                    if (successCB) successCB(arguments);
                }

                var getEditableFieldList = function() {
                    return SFDC.getSObjectType(that.sobject)
                        .describe()
                        .then(function(describeResult) {

                            return _.pluck(_.filter(describeResult.fields, function(fieldInfo) {
                                return fieldInfo.updateable;
                            }), "name");
                        });
                }

                if (model) {

                    // Setup the fieldlist for save operation
                    this._whenModelReady().then(function() {
                        
                        // Check if fieldlist is not specified. If not, then generate that list based on changed attributes.
                        if (!options.fieldlist) {
                            options.fieldlist = changedAttributes;

                            // Check if the record was modified locally and the current save operation is not cache only.
                            // If yes, we will need to send all the updateable fields for save to server.
                            var cacheMode = options.cacheMode || model.cacheMode;
                            cacheMode = _.isFunction(cacheMode) ? cacheMode('save') : cacheMode;

                            if (model.get('__local__') && cacheMode != Force.CACHE_MODE.CACHE_ONLY) {
                                // Get all the updatable fields and union them with the list provided by the user.
                                return getEditableFieldList().then(function(fieldlist) {
                                    options.fieldlist = _.union(
                                        _.intersection(_.keys(model.attributes), fieldlist),
                                        options.fieldlist || []
                                    );
                                });
                            }
                        }
                    }).then(function() {
                        // During create, add the attibutes field in the fieldlist for save.
                        // We use attributes property to index data offline
                        if (model.isNew()) 
                            options.fieldlist = _.union(['attributes'], options.fieldlist);
                        // Perform save (upsert) against the server
                        model.save(null, options);
                    });
                } else if (!this.autosync) {
                    //if sync was not auto initiated, trigger a 'invalid' event
                    this.fire('invalid', 'sobject Type required for save.');
                }
            }

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        },

        /**
         * Initiate the deleting of record data from the relevant data store (server/offline store).
         *
         * @method destroy
         */
        destroy: function(options) {

            var operation = function() {
                var model = this._model;
                options = _.extend({mergeMode: this.mergemode, wait: true}, options);
                if (model && model.id) {
                    this._whenModelReady().then(function() {
                        // Perform delete of record against the server
                        model.destroy(options);
                    });
                } else if (!this.autosync) {
                    //if sync was not auto initiated, trigger a 'invalid' event
                    this.fire('invalid', 'sobject Type and recordid required for delete.');
                }
            }

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        },

        // Resets all the properties on the model.
        // Recreates model if sobject type or id of model has changed.
        _init: function() {
            var that = this,
                model;

            if (this.sobject && typeof this.sobject === 'string') {
                that._changedAttributes = [];
                model = this._model = createModel(this.sobject);
                model.cacheMode = this.cachemode;
                model.fieldlist = processFieldlist(this.fieldlist);
                model.set(model.idAttribute, this.recordid);
                model.set({attributes: {type: this.sobject}});
                model.on('all', function(event) {
                    switch(event) {
                        case 'change':
                            var changedFields = _.keys(model.changedAttributes());
                            changedFields = changedFields.filter(function(field) {
                                return field.indexOf('__') != 0;
                            })
                            that._changedAttributes = _.union(that._changedAttributes, changedFields);
                            break;
                        case 'sync': that._changedAttributes = [];
                    }
                    that.fire(event);
                });

                this.fields = new SObjectViewModel(model);
                if (this.autosync) this.fetch();
            }
        },
        // All CRUD operations should ensure that the model is ready by checking this promise.
        _whenModelReady: function() {
            var model = this._model;
            var store = this.$.store;
            return $.when(store.cacheReady, SFDC.launcher)
                .then(function() {
                    model.cache = store.cache;
                    model.cacheForOriginals = store.cacheForOriginals;
                });
        },
        _updateCacheMode: function() {
            if (this._model) this._model.cacheMode = this.cachemode;
        }
    });

})(window.SFDC);
