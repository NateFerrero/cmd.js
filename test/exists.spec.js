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
        expect(cmd.exists).to.be.a('function');
    });

    describe('returns false for', function () {

        it('undefined', function () {
            expect(cmd.exists(undefined)).to.deep.equal([false]);
        });

        it('null', function () {
            expect(cmd.exists(null)).to.deep.equal([false]);
        });

    });

    describe('returns true for', function () {

        it('0', function () {
            expect(cmd.exists(0)).to.deep.equal([true]);
        });

        it('false', function () {
            expect(cmd.exists(false)).to.deep.equal([true]);
        });

        it('true', function () {
            expect(cmd.exists(true)).to.deep.equal([true]);
        });

        it('""', function () {
            expect(cmd.exists("")).to.deep.equal([true]);
        });

        it('{}', function () {
            expect(cmd.exists({})).to.deep.equal([true]);
        });

    });

});
