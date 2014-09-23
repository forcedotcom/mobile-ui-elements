(function(SFDC, Force) {

    "use strict";

    var sobjectStores = {};
    var originalSObjectStores = {};

    var generateIndexSpec = function(describeResult, fieldsToIndex) {
        var indexSpecs = [{path: "attributes.type", type: "string"}];
        if (describeResult) {
            describeResult.fields.forEach(function(field) {
                if (field.type == 'reference' || _.contains(fieldsToIndex, field.name)) {
                    var storeType;
                    switch(field.type) {
                        case 'int': storeType = 'integer'; break;
                        case 'double': storeType = 'real'; break;
                        default: storeType = 'string';
                    }
                    indexSpecs.push({
                        path: field.name,
                        type: storeType
                    });
                }
            });
        } else if (fieldsToIndex) { // If describe sobject is not available, just create index on specified fields.
            fieldsToIndex.forEach(function(field) {
                indexspec.push({
                    path: field,
                    type: "string"
                });
            });
        }
        return indexSpecs;
    }

    // Returns either a promise to track store creation progress, or returns the store if ready.
    var createStores = function(sobject, keyField, fieldsToIndex) {
        var dataStore;
        var originalDataStore;
        var that = this;

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
                    that.fire('store-ready');
                });
            // Capture the store creation promise, until the real store gets assigned.
            // This will prevent creation of same store twice.
            sobjectStores[sobject] = storePromise;
        }
        return sobjectStores[sobject];
    }

    var processName = function(sobject) {
        return typeof sobject === 'string' ? sobject.toLowerCase() : undefined;
    }

    //TBD: Add a property "autoIndex" to generate indexes based on object describe result
    Polymer('force-sobject-store', {
        sobject: null,
        observe: {
            sobject: "init",
            fieldstoindex: "init"
        },
        get cacheReady() {
            return this.init();
        },
        get cache() {
            var cache = sobjectStores[processName(this.sobject)];
            if (cache instanceof Force.StoreCache) return cache;
        },
        get cacheForOriginals() {
            var cache = originalSObjectStores[processName(this.sobject)];
            if (cache instanceof Force.StoreCache) return cache;
        },
        init: function() {
            var that = this;
            var sobject = processName(this.sobject);

            // Create StoreCache if smartstore is available. Also check if sobject is properly set
            if (navigator.smartstore && sobject) {
                var keyField = ((sobject && sobject.indexOf('__x') > 0)
                        ? 'ExternalId' : 'Id');
                var fieldsToIndex = typeof this.fieldstoindex === 'string' ?
                    this.fieldstoindex.trim().split(/\s+/) : [];

                // Create offline stores if launcher is complete
                return SFDC.launcher.then(function() {
                    var storeCreator = createStores.bind(that);
                    return storeCreator(sobject, keyField, fieldsToIndex);
                });
            }
        },
        destroy: function() {
            var cacheDestroy, cacheForOriginalsDestroy;
            var that = this;

            if (this.cache) {
                cacheDestroy = Force.smartstoreClient.removeSoup(this.cache.soupName);
                delete sobjectStores[processName(this.sobject)];
            }
            if (this.cacheForOriginals) {
                cacheForOriginalsDestroy = Force.smartstoreClient.removeSoup(this.cacheForOriginals.soupName);
                delete originalSObjectStores[processName(this.sobject)];
            }
            return $.when(cacheDestroy, cacheForOriginalsDestroy).then(function() {
                // Fire this only when actual remove soup operation has happened
                if (cacheDestroy) that.fire('store-destroy');
            });
        }
    });

}).call(this, window.SFDC, window.Force);
