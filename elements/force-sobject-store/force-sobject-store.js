(function(SFDC, Force) {

    "use strict";

    var sobjectStores = {};
    var originalSObjectStores = {};

    var generateIndexSpec = function(describeResult, fieldsToIndex) {
        var indexSpecs = [{path: "attributes.type", type: "string"}];
        describeResult.fields.forEach(function(field) {
            if (field.type == 'reference' || _.indexOf(fieldsToIndex, field.name) >= 0) { 
                var storeType;
                switch(field.type) {
                    case 'int': storeType = 'integer'; break;
                    case 'double': storeType = 'real'; break;
                    default: storeType = 'string'; 
                }
                indexSpecs.push({
                    path: field.name,
                    type: storeType
                })
            }
        })
        return indexSpecs;
    }

    Polymer('force-sobject-store', {
        observe: {
            "sobject": "init",
            "keyfield": "init",
            "fieldstoindex": "init"
        },
        sobject: null,
        keyfield: null,
        get cacheReady() {
            return SFDC.launcher.then(this.init.bind(this));
        },
        get cacheForOriginals() {
            return originalSObjectStores[this.sobject];
        },
        init: function() {
            var dataStore;
            var originalDataStore;
            var sobject = this.sobject;
            var keyfield = this.keyfield ||
                ((sobject && sobject.toLowerCase().indexOf('__x') > 0)
                    ? 'ExternalId' : 'Id');
            var fieldsToIndex = this.fieldstoindex != null ? this.fieldstoindex.split(",") : [];

            // Create StoreCache if smartstore is available.
            if (navigator.smartstore) {
                // Initiate store cache creation if none initiated already for this sobject
                if (sobject && !sobjectStores[sobject]) {
                    var storePromise = SFDC.launcher
                        .then(function() {
                            originalDataStore = new Force.StoreCache(sobject + "-originals", null, keyfield);
                            return originalDataStore.init();
                        }).then(function() {
                            originalSObjectStores[sobject] = originalDataStore;
                            return SFDC.getSObjectType(sobject).describe();
                        }).then(function(describeResult) {
                            return generateIndexSpec(describeResult, fieldsToIndex);
                        }).then(function(indexSpecs) {
                            dataStore = new Force.StoreCache(sobject, indexSpecs, keyfield);
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
        }
    });

}).call(this, window.SFDC, window.Force);