(function(SFDC, Force) {

    "use strict";

    var sobjectStores = {};
    var originalSObjectStores = {};

    var generateIndexSpec = function(describeResult, fieldsToIndex) {
        var indexSpecs = [{path: "attributes.type", type: "string"}];
        describeResult.fields.forEach(function(field) {
            if (field.type == 'reference' || _.contains(fieldsToIndex, field.name.toLowerCase())) {
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

    // Returns either a promise to track store creation progress, or returns the store if ready.
    var createStores = function(sobject, keyField, fieldsToIndex) {
        var dataStore;
        var originalDataStore;

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
        ready: function() {
            this.init();
        },
        init: function() {
            var that = this;
            var sobject = processName(this.sobject);

            // Create StoreCache if smartstore is available. Also check if sobject is properly set
            if (navigator.smartstore && sobject) {
                var keyField = ((sobject && sobject.indexOf('__x') > 0)
                        ? 'ExternalId' : 'Id');
                var fieldsToIndex = typeof this.fieldstoindex === 'string' ?
                    this.fieldstoindex.toLowerCase().trim().split(/\s+/) : [];

                // Create offline stores if launcher is complete
                return SFDC.launcher.then(function() {
                    return createStores(sobject, keyField, fieldsToIndex);
                }).then(function() {
                    that.fire('store-ready');
                });
            }
        }
    });

}).call(this, window.SFDC, window.Force);
