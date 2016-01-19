(function(SFDC) {

    "use strict";

    Polymer({
        is: 'force-sobject-sync', 
        properties: {
            sobject: String,
            query: String,
            fieldstoindex: {
                type: String,
                notify: true
            }
        },
        observers: ["fetch(sobject, query)"],

        ready: function() {
            document.addEventListener('sync', this.syncEvent.bind(this));
        },
        fetch: function() {
            var store = this.$.store;
            var that = this;
            if (SFDC.isOnline() && this.sobject && this.query) {
                $.when(store.cacheReady, SFDC.launcher)
                .then(function() {
                    cordova.require('com.salesforce.plugin.smartsync').syncDown(
                        {type:"soql", query:that.query}, 
                        store.cache.soupName, {}, 
                        function(result) {
                            that.syncId = result._soupEntryId;
                            // || result.syncId;
                        }
                    );
                });
            }
        },
        syncEvent: function(e) {
            var syncId = e.detail._soupEntryId;
            // || e.detail.syncId;
            if (this.syncId >= 0 && syncId == this.syncId) {
                if (e.detail.status == 'DONE') this.fire('sync-complete', e.detail);
                else if (e.detail.status == 'RUNNING') {
                    this.fire('sync-progress', e.detail);
                }
            }
        }
    });

})(window.SFDC);