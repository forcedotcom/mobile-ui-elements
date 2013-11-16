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

    var createStores = function(sobject, keyField, fieldsToIndex) {
        var dataStore;
        var originalDataStore;

        // Create StoreCache if smartstore is available.
        if (navigator.smartstore) {
            // Initiate store cache creation if none initiated already for this sobject
            if (sobject && !sobjectStores[sobject]) {
                var sobjectType = SFDC.getSObjectType(sobject);
                // Initiate store creation of working cache copy based on describe info and fieldstoindex.
                var storePromise = $.when(sobjectType.describe(), fieldsToIndex)
                    .then(generateIndexSpec)
                    .then(function(indexSpecs) {
                        // Create store based on indexspec
                        dataStore = new Force.StoreCache(sobject, indexSpecs, keyField);
                        // Create store for original copy. No indexspec requird for original copy.
                        originalDataStore = new Force.StoreCache("__" + sobject + "__original", null, keyField);
                        return $.when(dataStore.init(), originalDataStore.init());
                    }).then(function() {
                        sobjectStores[sobject] = dataStore;
                        originalSObjectStores[sobject] = originalDataStore;
                    });
                // Capture the store creation promise, until the real store gets assigned.
                // This will prevent creation of same store twice.
                sobjectStores[sobject] = storePromise;
            }
            return sobjectStores[sobject];
        }
    }

    Polymer('force-sobject-store', {
        sobject: null,
        get cacheReady() {
            return this.init();
        },
        get cache() {
            var cache = sobjectStores[this.sobject];
            if (cache instanceof Force.StoreCache) return cache;
        },
        get cacheForOriginals() {
            var cache = originalSObjectStores[this.sobject];
            if (cache instanceof Force.StoreCache) return cache;
        },
        init: function() {
            var sobject = this.sobject;
            var keyField = ((sobject && sobject.toLowerCase().indexOf('__x') > 0)
                    ? 'ExternalId' : 'Id');
            var fieldsToIndex = this.fieldstoindex != null ? this.fieldstoindex.split(",") : [];

            // Create offline stores if launcher is complete
            return SFDC.launcher.then(function() {
                return createStores(sobject, keyField, fieldsToIndex);
            });
        }
    });

}).call(this, window.SFDC, window.Force);
