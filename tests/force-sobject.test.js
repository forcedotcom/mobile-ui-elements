describe('force-sobject', function() {
    var sobject;

    beforeEach(function() {
        sobject = document.createElement('force-sobject');
        sobject.autosync = false;
        SFDC.launch({
            accessToken: 'mock_token',
            instanceUrl: 'https://mock.salesforce.com'
        });
    });

    describe('#model', function() {
        it('should be undefined when sobject type is not defined', function(){
            sobject.should.not.have.property('_model');
        });
        it('should be defined when sobject type is defined', function(done) {
            sobject.sobject = 'asdf';
            sobject.async(function() {
                sobject.should.have.property('_model');
                done();
            });
        });
        it('should have idAttribute as "Id" when standard sobject', function(done) {
            sobject.sobject = 'Account';
            sobject.async(function() {
                sobject._model.idAttribute.should.eql('Id');
                done();
            });
        });
        it('should have idAttribute as "Id" when custom sobject', function(done) {
            sobject.sobject = 'Custom__c';
            sobject.async(function() {
                sobject._model.idAttribute.should.eql('Id');
                done();
            });
        });
        it('should have idAttribute as "ExternalId" when external data sobject', function(done) {
            sobject.sobject = 'External__x';
            sobject.async(function() {
                sobject._model.idAttribute.should.eql('ExternalId');
                done();
            });
        });
    });

    describe('#fieldlist', function() {
        it('should create fields hashmap for all fields specified in fieldlist', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            sobject.fieldlist = 'Name  BillingCity  Phone';
            sobject.async(function() {
                sobject.fields.should.have.properties('Name', 'BillingCity', 'Phone');
                done();
            });
        });
    });

    describe('#autosync', function() {
        it('should auto fetch data when sobject and recordid are set', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            sobject.autosync = true;
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                done();
            }
        });
        it('should not auto fetch data when autosync is false', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                false.should.be.ok; //throw error
            }
            sobject.async(done);
        });
    });

    describe('#fetch()', function() {
        it('should trigger "invalid" event and return self when sobject type is not defined', function(done) {
            sobject.addEventListener('invalid', function() {
                done();
            });
            sobject.fetch().should.be.equal(sobject);

        });
        it('should trigger "invalid" event and return self when recordid is not defined', function(done) {
            sobject.sobject = 'account';
            sobject.addEventListener('invalid', function() {
                done();
            });
            sobject.fetch().should.be.equal(sobject);

        });
        it('should throw error event when xhr fails', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                error();
            };
            sobject.addEventListener('error', function() {
                done();
            });
            sobject.fetch();
        });
        it('should throw change event when model changes', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            sobject.addEventListener('change', function() {
                sobject.fields.Name.should.eql('Mock Account');
                done();
            });
            sobject.async(function() {
                sobject._model.set('Name', 'Mock Account');
            });
        });
        it('should fetch data and throw sync event when sobject and recordid are set', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({
                    attributes: {type: this.sobject},
                    Id: '001000fakeid',
                    Name: 'Mock Account'
                });
            };
            sobject.addEventListener('sync', function() {
                sobject.fields.Name.should.eql('Mock Account');
                done();
            });
            sobject.fetch();
        });
    });

    describe('#save()', function() {
        it('should trigger "invalid" event and return self when sobject type is not defined', function(done) {
            sobject.addEventListener('invalid', function() {
                done();
            });
            sobject.save().should.be.equal(sobject);

        });
        it('should throw error event when xhr fails', function(done) {
            sobject.sobject = 'account';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                error();
            };
            sobject.addEventListener('error', function() {
                done();
            });
            sobject.save();
        });
        it('should update record id when insert is successful', function(done) {
            sobject.sobject = 'account';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({
                    id: '001000fakeid',
                    success: true
                });
            };
            sobject.addEventListener('sync', function() {
                sobject.fields.Id.should.eql('001000fakeid');
                sobject.recordid.should.eql('001000fakeid');
                done();
            });
            sobject.save();
        });
        it('should throw sync event when update is successful', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({
                    id: '001000fakeid',
                    success: true
                });
            };
            sobject.addEventListener('sync', function() {
                done();
            });
            sobject.save();
        });
        it('should save only specified fields when fieldlist is specified on save', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error, method, payload) {
                payload = eval('(' + payload + ')');
                payload.should.have.keys('BillingCity');
                payload.should.have.property('BillingCity', 'San Francisco');
                done();
            };
            sobject.async(function() {
                sobject._model.set({'Name': 'Mock Account', 'BillingCity': 'San Francisco'})
                sobject.save({fieldlist: ['BillingCity']});
            });
        });
        it('should save only changed fields when no fieldlist is specified', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error, method, payload) {
                payload = eval('(' + payload + ')');
                payload.should.have.keys('BillingCity');
                payload.should.have.property('BillingCity', 'San Francisco');
                done();
            };
            sobject.async(function() {
                sobject._model.set({'Name': 'Mock Account'});
                sobject._changedAttributes.should.containEql('Name');
                // Reset changedAttributes to track future changes
                sobject._changedAttributes = [];
                sobject._model.set({'BillingCity': 'San Francisco'});
                sobject.save();
            });
        });
    });

    describe('#destroy()', function() {
        it('should trigger "invalid" event and return self when sobject type is not defined', function(done) {
            sobject.addEventListener('invalid', function() {
                done();
            });
            sobject.destroy().should.be.equal(sobject);

        });
        it('should trigger "invalid" event and return self when recordid is not defined', function(done) {
            sobject.sobject = 'account';
            sobject.addEventListener('invalid', function() {
                done();
            });
            sobject.destroy().should.be.equal(sobject);

        });
        it('should throw error event when xhr fails', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                error();
            };
            sobject.addEventListener('error', function() {
                done();
            });
            sobject.destroy();
        });
        it('should throw destroy event when delete is successful', function(done) {
            sobject.sobject = 'account';
            sobject.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({
                    id: '001000fakeid',
                    success: true
                });
            };
            sobject.addEventListener('destroy', function() {
                done();
            });
            sobject.destroy();
        });
    });
});