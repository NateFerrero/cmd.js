var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the title plugin
 */
cmd.use('case');

/**
 * Tests
 */
describe('cmd.case', function () {

    it('is a function', function () {
        expect(cmd.case).to.be.a('function');
    });

    describe('.lower', function () {

        it('is a function', function () {
            expect(cmd.case.lower).to.be.a('function');
        });

        it('returns the lowercase value', function () {
            expect(cmd.case.lower('A normal looking sentence.')).to.deep.equal(['a normal looking sentence.']);
        });
    });

    describe('.title', function () {

        it('is a function', function () {
            expect(cmd.case.title).to.be.a('function');
        });

        it('returns the titlecase value', function () {
            expect(cmd.case.title('A normal looking sentence.')).to.deep.equal(['A Normal Looking Sentence.']);
        });
    });

    describe('.upper', function () {

        it('is a function', function () {
            expect(cmd.case.upper).to.be.a('function');
        });

        it('returns the uppercase value', function () {
            expect(cmd.case.upper('A normal looking sentence.')).to.deep.equal(['A NORMAL LOOKING SENTENCE.']);
        });
    });
});
