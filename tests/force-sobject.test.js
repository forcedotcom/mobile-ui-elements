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

    describe('#fetch', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.fetch().should.be.equal(sobject);
        });
        it('should fetch data when sobject and recordid are set', function(done) {
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

    describe('#save', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.save().should.eql(sobject);
        });
    });

    describe('#delete', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.delete().should.eql(sobject);
        });
    });
});