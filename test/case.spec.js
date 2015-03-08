var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the case plugin
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
            expect(cmd.case.lower).to.be.an('object');
        });

        it('returns the lowercase value', function () {
            expect(cmd.case.lower.with('A normal looking sentence.')).to.deep.equal(['a normal looking sentence.']);
        });
    });

    describe('.title', function () {

        it('is a function', function () {
            expect(cmd.case.title).to.be.an('object');
        });

        it('returns the titlecase value', function () {
            expect(cmd.case.title.with('A normal looking sentence.')).to.deep.equal(['A Normal Looking Sentence.']);
        });
    });

    describe('.upper', function () {

        it('is a function', function () {
            expect(cmd.case.upper).to.be.an('object');
        });

        it('returns the uppercase value', function () {
            expect(cmd.case.upper.with('A normal looking sentence.')).to.deep.equal(['A NORMAL LOOKING SENTENCE.']);
        });
    });
});
