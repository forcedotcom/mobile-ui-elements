(function(SFDC, Force) {

    "use strict";

    var sobjectStores = {};

    var generateIndexSpec = function(describeResult) {
        var indexSpecs = [{path: "attributes.type", type: "string"}];
        describeResult.fields.forEach(function(field) {
            if (field.type == 'reference') {
                indexSpecs.push({
                    path: field.name,
                    type: 'string'
                })
            }
        })
        return indexSpecs;
    }

    Polymer('force-sobject-store', {
        sobject: null,
        keyField: null,
        get cacheReady() {
            return $.when(sobjectStores[this.sobject]);
        },
        get cache() {
            var cache = sobjectStores[this.sobject];
            if (cache instanceof Force.StoreCache) return cache;
        },
        init: function() {
            var dataStore;
            var sobject = this.sobject;
            var keyField = keyField || (sobject.toLowerCase().indexOf('__x') > 0 ? 'ExternalId' : 'Id');

            // Create StoreCache is smartstore is available.
            if (navigator.smartstore) {
                // Initiate store cache creation if none initiated already for this sobject
                if (sobject && !sobjectStores[sobject]) {
                    var storePromise = SFDC.getSObjectType(sobject).describe()
                        .then(generateIndexSpec)
                        .then(function(indexSpecs) {
                            dataStore = new Force.StoreCache(sobject, indexSpecs, keyField);
                            return dataStore.init();
                        }).then(function() {
                            sobjectStores[sobject] = dataStore;
                            return dataStore;
                        });
                    // Capture the store creation promise, until the real store gets assigned.
                    sobjectStores[sobject] = storePromise;
                }
            }
        },
        sobjectChanged: function() {
            var that = this;
            SFDC.launcher.done(function() {
                that.init();
            });
        },
        ready: function() {
            if (this.sobject) {
                var that = this;
                SFDC.launcher.done(function() {
                    that.init();
                });
            }
        }
    });

}).call(this, window.SFDC, window.Force);