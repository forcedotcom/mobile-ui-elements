(function(SFDC) {

    var viewProps = {
        sobject: null,
        recordid: null,
        fieldlist: null,
        idfield: "Id",
        autosync: true,
        mergemode: Force.MERGE_MODE.OVERWRITE
    };

    var createModel = function(sobject) {
        return new (Force.SObject.extend({
            cacheMode: SFDC.cacheMode,
            sobjectType: sobject,
        }));
    }

    Polymer('force-sobject', _.extend({}, viewProps, {
        observe: {
            sobject: "init",
            recordid: "init",
            fieldlist: "init",
            idfield: "init"
        },
        // Resets all the properties on the model.
        // Recreates model if sobject type or id of model has changed.
        init: function() {
            var model = this.model;
            if (typeof model == "undefined" ||
                model.sobjectType != this.sobject ||
                model.id != this.recordid) {
                model = this.model = createModel(this.sobject);
            }
            model.fieldlist = this.fieldlist;
            model.idAttribute = this.idfield;
            model.set(this.idfield, this.recordid == "" ? null : this.recordid);
            model.set({attributes: {type: this.sobject}});
        },
        // All CRUD operations should ensure that the model is ready by checking this promise.
        whenModelReady: function() {
            var model = this.model;
            var store = this.$.store;

            this.init();
            return $.when(store.cacheReady, SFDC.launcher)
                .then(function() {
                    model.cache = store.cache;
                    model.cacheForOriginals = store.cacheForOriginals;
                });
        },
        ready: function() {
            this.init();
            if (this.autosync) this.fetch();
        },
        // Re-create model instance
        reset: function() {
            var that = this;
            this.model = createModel(this.sobject);
            this.init();
            this.whenModelReady().then(function() {
                if (that.autosync) that.fetch();
            });
        },
        fetch: function(opts) {
            var model = this.model;
            if (model.sobjectType && model.id) {
                this.whenModelReady().then(function() {
                    model.fetch(opts);
                });
            } else console.warn('sobject Type and recordid required for fetch.');

            return this;
        },
        save: function(options) {
            var model = this.model;
            options.mergeMode = options.mergeMode || this.mergemode;
            if (model.sobjectType) {
                this.whenModelReady().then(function() {
                    // Perform save (upsert) against the server
                    model.save(null, options);
                });
            } else console.warn('sobject Type required for save.');
        },
        delete: function(options) {
            var model = this.model;
            options.mergeMode = options.mergeMode || this.mergemode;
            if (model.sobjectType && model.id) {
                this.whenModelReady().then(function() {
                    // Perform delete of record against the server
                    this.model.destroy(options);
                });
            } else console.warn('sobject Type and recordid required for delete.');
        },
        set: function(key, val) {
            this.model.set(key, val);
        },
        get: function(key) {
            return this.model.get(key);
        }
    }));

})(window.SFDC);
