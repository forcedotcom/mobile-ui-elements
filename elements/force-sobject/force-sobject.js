(function(SFDC) {

    var viewProps = {
        sobject: null,
        recordid: null,
        fieldlist: null,
        idfield: "Id",
        autosync: true
    };

    Polymer('force-sobject', _.extend({}, viewProps, {
        observe: {
            sobject: "reset",
            recordid: "reset",
            fieldlist: "reset",
            idfield: "reset"
        },
        init: function() {
            var that = this;
            this.model = new (Force.SObject.extend({
                cacheMode: SFDC.cacheMode,
                sobjectType: this.sobject,
                fieldlist: this.fieldlist,
                idAttribute: this.idfield
            }));
            this.model.set(this.idfield, this.recordid == "" ? null : this.recordid);
            this.model.set({attributes: {type: this.sobject}});

            var store = this.$.store;
            $.when(store.cacheReady, SFDC.launcher)
            .done(function() {
                that.model.cacheForOriginals = store.cacheForOriginals;
                that.model.cache = store.cache;
            });

            return this;
        },
        ready: function() {
            this.init();
            if (this.autosync) this.fetch();
        },
        reset: function(forceReset) {
            if (forceReset ||
                !this.model ||
                this.model.sobjectType != this.sobject ||
                this.model.id != this.recordid ||
                this.model.idAttribute != this.idfield ||
                this.model.fieldlist != this.fieldlist) {

                this.init();
                if (this.autosync) this.fetch();
            }
            return this;
        },
        fetch: function() {
            var model = this.model;
            //TBD: May be listen for the event when app is ready to do the fetch. Or fetch can be triggered by the consumer.
            if (model.sobjectType && model.id) {
                $.when(this.$.store.cacheReady, SFDC.launcher)
                .done(function() {
                    model.fetch();
                });
            } else console.warn('sobject Type and recordid required for fetch.');

            return this;
        },
        save: function(options) {
            this.model.save(null, options);
        },
        delete: function(options) {
            this.model.destroy(options)
        },
        set: function(key, val) {
            this.model.set(key, val);
        },
        get: function(key) {
            return this.model.get(key);
        }
    }));

})(window.SFDC);
