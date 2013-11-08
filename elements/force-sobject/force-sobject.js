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
            this.model.set(this.idfield, this.recordid);

            $.when(this.$.store.cacheReady, SFDC.launcher)
            .done(function(cache) {
                that.model.cache = cache;
            });

            return this;
        },
        ready: function() {
            this.init();
            if (this.autosync) this.fetch();
        },
        reset: function() {
            if (!this.model ||
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
                .done(function(cache) {
                    model.cache = cache;
                    model.fetch();
                });
            } else console.warn('sobject Type and recordid required for fetch.');

            return this;
        },
        save: function() {
            // Perform save (upsert) against the server
        },
        delete: function() {
            // Perform delete of record against the server
        }
    }));

})(window.SFDC);