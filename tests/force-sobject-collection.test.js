/* TBD: Need to add more offline tests */
describe('force-sobject-collection', function() {
    var sobjectColl;
    var origAjax;
    var smartstore;

    /* Disable smartstore for this testsuite */
    before(function() {
        smartstore = navigator.smartstore;
        navigator.smartstore = undefined;
    });

    after(function() {
        navigator.smartstore = smartstore;
    });

    beforeEach(function() {
        sobjectColl = document.createElement('force-sobject-collection');
        sobjectColl.autosync = false;
        origAjax = Force.forcetkClient.impl.ajax;
    });

    afterEach(function() {
        Force.forcetkClient.impl.ajax = origAjax;
    });

    describe('#collection', function() {
        it('should always be defined', function(){
            sobjectColl.collection.should.be.ok.and.be.an.instanceOf(Force.SObjectCollection);
        });
        it('should have undefined config when sobject type is not defined', function(){
            sobjectColl.collection.should.not.have.property('config');
        });
        it('should be empty when sobject type is not defined', function(){
            sobjectColl.collection.should.have.length(0);
        });
        it('should not fetch data when sobject type is not defined', function(done) {
            sobjectColl.autosync = true;
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                false.should.be.ok; //throw error
            }
            sobjectColl.async(done);
        });
    });

    describe('#autosync', function() {
        it('should auto fetch data when sobject and query options set', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            sobjectColl.autosync = true;
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                done();
            }
            Platform.flush();
        });
        it('should not auto fetch data when autosync is false', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.recordid = '001000fakeid';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                false.should.be.ok; //throw error
            }
            sobjectColl.async(done);
        });
    });

    describe('#querytype', function() {
        it('should not fetch data when querytype is not defined', function() {
            sobjectColl.sobject = 'account';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                false.should.be.ok; //throw error
            }
            sobjectColl.fetch();
        });
        it('should fetch recent items when querytype is mru', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                path.should.endWith('/sobjects/account/');
                callback({
                    recentItems: [{
                        attributes: {type: 'account'},
                        Id: 'mockid',
                        Name: 'mockname'
                    }]
                });
            }
            sobjectColl.addEventListener('sync', function() {
                sobjectColl.collection.should.have.length(1);
                sobjectColl.collection.models[0].id.should.eql('mockid');
                sobjectColl.collection.models[0].attributes.should.have.property('Name', 'mockname');
                done();
            });
            sobjectColl.fetch();
        });
        it('should execute soql when querytype is soql', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'soql';
            sobjectColl.query = "select id, name from account";
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                path.should.endWith('/query?q=' + encodeURI(sobjectColl.query));
                callback({
                    records: [{
                        attributes: {type: 'account'},
                        Id: 'mockid',
                        Name: 'mockname'
                    }],
                    totalSize: 1
                });
            }
            sobjectColl.addEventListener('sync', function() {
                sobjectColl.collection.should.have.length(1);
                sobjectColl.collection.models[0].id.should.eql('mockid');
                sobjectColl.collection.models[0].attributes.should.have.property('Name', 'mockname');
                done();
            });
            sobjectColl.fetch();
        });
        it('should execute sosl when querytype is sosl', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'sosl';
            sobjectColl.query = "FIND {*} IN ALL FIELDS RETURNING Account (Id, Name)";
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                path.should.endWith('/search?q=' + encodeURI(sobjectColl.query));
                callback([{
                    attributes: {type: 'account'},
                    Id: 'mockid',
                    Name: 'mockname'
                }]);
            }
            sobjectColl.addEventListener('sync', function() {
                sobjectColl.collection.should.have.length(1);
                sobjectColl.collection.models[0].id.should.eql('mockid');
                sobjectColl.collection.models[0].attributes.should.have.property('Name', 'mockname');
                done();
            });
            sobjectColl.fetch();
        });
    });

    describe('#maxsize', function() {
        it('should fetch more items when maxsize is -1', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'soql';
            sobjectColl.query = "select id, name from account";
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                if (path.indexOf('query') >= 0) {
                    callback({
                        records: [{
                            attributes: {type: 'account'},
                            Id: 'mockid1'
                        }],
                        totalSize: 1,
                        nextRecordsUrl: '/getmore'
                    });
                } else if (path.indexOf('getmore') >= 0) {
                    callback({
                        records: [{
                            attributes: {type: 'account'},
                            Id: 'mockid2'
                        }],
                        totalSize: 1
                    });
                }
            }
            sobjectColl.addEventListener('sync', function() {
                sobjectColl.collection.should.have.length(2);
                sobjectColl.collection.models[0].id.should.eql('mockid1');
                sobjectColl.collection.models[1].id.should.eql('mockid2');
                done();
            });
            sobjectColl.fetch();
        });
        it('should not fetch more items when maxsize is reached', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'soql';
            sobjectColl.query = "select id, name from account";
            sobjectColl.maxsize = 1;
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                if (path.indexOf('query') >= 0) {
                    callback({
                        records: [{
                            attributes: {type: 'account'},
                            Id: 'mockid1'
                        }],
                        totalSize: 1,
                        nextRecordsUrl: '/getmore'
                    });
                } else  false.should.be.ok;
            }
            sobjectColl.addEventListener('sync', function() {
                sobjectColl.collection.should.have.length(1);
                sobjectColl.collection.models[0].id.should.eql('mockid1');
                done();
            });
            sobjectColl.fetch();
        });
    });

    describe('#fetch()', function() {
        it('should throw reset event when collection is fetched', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({ recentItems: [] });
            }
            sobjectColl.addEventListener('reset', function() {
                done();
            });
            sobjectColl.fetch();
        });
        it('should throw sync event when collection is fetched', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                callback({ recentItems: [] });
            }
            sobjectColl.addEventListener('sync', function() { done(); });
            sobjectColl.fetch();
        });
        it('should throw error event when collection fetch fails', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            Force.forcetkClient.impl.ajax = function(path, callback, error) {
                error();
            }
            sobjectColl.addEventListener('error', function() { done(); });
            sobjectColl.fetch();
        });
    });

    describe('#reset()', function() {
        it('should empty the collection and throw reset event when reset', function(done) {
            sobjectColl.sobject = 'account';
            sobjectColl.querytype = 'mru';
            sobjectColl.collection.add({Id: 'Mock'});
            sobjectColl.addEventListener('reset', function() {
                sobjectColl.collection.should.have.length(0);
                done();
            });
            sobjectColl.async(function() {
                sobjectColl.reset();
            });
        });
    });
});