var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the exists plugin
 */
cmd.use('exists');

/**
 * Tests
 */
describe('cmd.exists', function () {

    it('is a function', function () {
        expect(cmd.exists).to.be.an('object');
    });

    describe('returns false for', function () {

        it('undefined', function () {
            expect(cmd.exists.with(undefined)).to.deep.equal([false]);
        });

        it('null', function () {
            expect(cmd.exists.with(null)).to.deep.equal([false]);
        });

    });

    describe('returns true for', function () {

        it('0', function () {
            expect(cmd.exists.with(0)).to.deep.equal([true]);
        });

        it('false', function () {
            expect(cmd.exists.with(false)).to.deep.equal([true]);
        });

        it('true', function () {
            expect(cmd.exists.with(true)).to.deep.equal([true]);
        });

        it('""', function () {
            expect(cmd.exists.with("")).to.deep.equal([true]);
        });

        it('{}', function () {
            expect(cmd.exists.with({})).to.deep.equal([true]);
        });

    });

});
