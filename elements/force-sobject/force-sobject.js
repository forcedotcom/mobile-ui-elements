(function(SFDC) {

    var viewProps = {
        sobject: null,
        recordid: null,
        fieldlist: null,
        autosync: true,
        mergemode: Force.MERGE_MODE.OVERWRITE
    };

    var createModel = function(sobject) {
        sobject = sobject.toLowerCase();

        return new (Force.SObject.extend({
            cacheMode: SFDC.cacheMode,
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
        setupProps(_.keys(model.attributes));

        // Setup an event listener to update properties whenever model attributes change
        model.on('change', function() {
            setupProps(_.difference(_.keys(model.attributes), _.keys(_self)));
        });
    }

    Polymer('force-sobject', _.extend({}, viewProps, {
        observe: {
            sobject: "init",
            recordid: "init",
            fieldlist: "init"
        },
        // Resets all the properties on the model.
        // Recreates model if sobject type or id of model has changed.
        init: function() {
            var that = this,
                model;

            if (this.sobject && typeof this.sobject === 'string') {
                model = this._model = createModel(this.sobject);
                model.id = this.recordid;
                model.fieldlist = this.fieldlist;
                model.set({attributes: {type: this.sobject}});
                model.on('sync', function() {
                    that.fire('sync');
                });

                this.fields = new SObjectViewModel(model);
                if (this.autosync) this.fetch();
            }
        },
        // All CRUD operations should ensure that the model is ready by checking this promise.
        whenModelReady: function() {
            var model = this._model;
            var store = this.$.store;
            return $.when(store.cacheReady, SFDC.launcher)
                .then(function() {
                    model.cache = store.cache;
                    model.cacheForOriginals = store.cacheForOriginals;
                });
        },
        ready: function() {
            this.init();
        },
        fetch: function(opts) {

            var operation = function() {
                var model = this._model;
                if (model && model.id) {
                    this.whenModelReady().then(function() {
                        model.fetch(opts);
                    });
                } else console.warn('sobject Type and recordid required for fetch.');
            }
            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        },
        save: function(options) {

            var operation = function() {
                var model = this._model;
                options = _.extend({mergeMode: this.mergemode}, options);
                if (model) {
                    this.whenModelReady().then(function() {
                        // Perform save (upsert) against the server
                        model.save(null, options);
                    });
                } else console.warn('sobject Type required for save.');
            }

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        },
        delete: function(options) {

            var operation = function() {
                var model = this._model;
                options = _.extend({mergeMode: this.mergemode}, options);
                if (model && model.id) {
                    this.whenModelReady().then(function() {
                        // Perform delete of record against the server
                        this._model.destroy(options);
                    });
                } else console.warn('sobject Type and recordid required for delete.');
            }

            // Queue the operation for next cycle after all change watchers are fired.
            this.async(operation.bind(this));
            return this;
        }
    }));

})(window.SFDC);
