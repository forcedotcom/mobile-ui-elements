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
            return SFDC.launcher.then(this.init.bind(this));
        },
        init: function() {
            var dataStore;
            var sobject = this.sobject;
            var keyField = this.keyField ||
                ((sobject && sobject.toLowerCase().indexOf('__x') > 0)
                    ? 'ExternalId' : 'Id');

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
                return sobjectStores[sobject];
            }
        },
        sobjectChanged: function() {
            SFDC.launcher.then(this.init.bind(this));
        },
        ready: function() {
            if (this.sobject) {
                SFDC.launcher.then(this.init.bind(this));
            }
        }
    });

}).call(this, window.SFDC, window.Force);