describe('force-sobject-store', function() {
    var sobjectStore;

    beforeEach(function() {
        sobjectStore = document.createElement('force-sobject-store');
        sobjectStore.autocreate = true;
        SFDC.launch({
            accessToken: 'mock_token',
            instanceUrl: 'https://mock.salesforce.com'
        });
    });

    describe('#cache', function() {
        it('all caches should be undefined when sobject type is not defined', function() {
            sobjectStore.cacheReady.should.exist;
            sobjectStore.should.have.property('cache', undefined);
            sobjectStore.should.have.property('cacheForOriginals', undefined);
        });
        it('should be valid when sobject type is defined', function(done) {
            sobjectStore.sobject = 'Mock__c';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                setTimeout(function() { callback({ fields: [] }); }, 0);
            };
            sobjectStore.addEventListener('store-ready', function() {
                sobjectStore.cache.should.be.an.instanceOf(Force.StoreCache).and.be.ok;
                sobjectStore.cache.soupName.should.eql('mock__c');
                sobjectStore.cacheForOriginals.soupName.should.eql('__mock__c__original');
                sobjectStore.cache.keyField.should.eql('Id');
                sobjectStore.cache.additionalIndexSpecs.should.have.length(1);
                sobjectStore.cache.additionalIndexSpecs.should.containEql({
                    path: 'attributes.type',
                    type: 'string'
                });
                done();
            });
        });
        it('should have ExternalId as keyField when sobject type is External Data object', function(done) {
            sobjectStore.sobject = 'Mock__x';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                setTimeout(function() { callback({ fields: [] });   }, 0);
            };
            sobjectStore.addEventListener('store-ready', function() {
                sobjectStore.cache.should.be.an.instanceOf(Force.StoreCache).and.be.ok;
                sobjectStore.cache.keyField.should.eql('ExternalId');
                done();
            });
        });
        it('should have additional indices for all sobject parent relationships', function(done) {
            sobjectStore.sobject = 'MockSObject1';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                setTimeout(function() {
                    callback({
                        fields: [{   name: 'rel1', type: 'reference' },
                                 {   name: 'rel2', type: 'reference' }]
                    });
                }, 0);
            };
            sobjectStore.addEventListener('store-ready', function() {
                sobjectStore.cache.should.be.an.instanceOf(Force.StoreCache).and.be.ok;
                sobjectStore.cache.additionalIndexSpecs.should.have.length(3);
                sobjectStore.cache.additionalIndexSpecs.should.containEql({
                    path: 'attributes.type',
                    type: 'string'
                }).and.containEql({
                    path: 'rel1',
                    type: 'string'
                }).and.containEql({
                    path: 'rel2',
                    type: 'string'
                });
                done();
            });
        });
        it('should have additional indices for additional fieldstoindex', function(done) {
            sobjectStore.sobject = 'MockSObject2';
            sobjectStore.fieldstoindex = 'Name Employees';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                setTimeout(function() {
                    callback({
                        fields: [{   name: 'Name', type: 'string' },
                                 {   name: 'Employees', type: 'int'  }]
                    });
                }, 0);
            };
            sobjectStore.addEventListener('store-ready', function() {
                sobjectStore.cache.should.be.an.instanceOf(Force.StoreCache).and.be.ok;
                sobjectStore.cache.additionalIndexSpecs.should.have.length(3);
                sobjectStore.cache.additionalIndexSpecs.should.containEql({
                    path: 'attributes.type',
                    type: 'string'
                }).and.containEql({
                    path: 'Name',
                    type: 'string'
                }).and.containEql({
                    path: 'Employees',
                    type: 'integer'
                });
                done();
            });
        });
        it('should not create index for non-existing fields in fieldstoindex', function(done) {
            sobjectStore.sobject = 'MockSObject3';
            sobjectStore.fieldstoindex = 'Invalid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                setTimeout(function() {
                    callback({
                        fields: [{   name: 'Name', type: 'string' },
                                 {   name: 'Employees', type: 'int'  }]
                    });
                }, 0);
            };
            sobjectStore.addEventListener('store-ready', function() {
                sobjectStore.cache.should.be.an.instanceOf(Force.StoreCache).and.be.ok;
                sobjectStore.cache.additionalIndexSpecs.should.have.length(1);
                sobjectStore.cache.additionalIndexSpecs.should.containEql({
                    path: 'attributes.type',
                    type: 'string'
                });
                done();
            });
        });
    });
});