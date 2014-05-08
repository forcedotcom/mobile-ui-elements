describe('force-sobject', function() {
    var sobject;

    beforeEach(function() {
        sobject = document.createElement('force-sobject');
    });

    describe('#model', function() {
        it('should be undefined when sobject type is not defined', function(){
            should.not.exist(sobject._model);
        });
        it('should be defined when sobject type is defined', function(done) {
            sobject.sobject = 'asdf';
            sobject.async(function() {
                done(should.exist(sobject._model));
            });
        });
    });

    describe('#fetch', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.fetch().should.be.equal(sobject);
        });
    });

    describe('#save', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.save().should.be.equal(sobject);
        });
    });

    describe('#delete', function() {
        it('should not throw error and return self when sobject type is not defined', function() {
            sobject.delete().should.be.equal(sobject);
        });
    });
});