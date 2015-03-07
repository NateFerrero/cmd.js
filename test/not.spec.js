var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the not plugin
 */
cmd.use('not');

/**
 * Tests
 */
describe('cmd.not', function () {

    it('is a function', function () {
        expect(cmd.not).to.be.a('function');
    });

    describe('returns true for', function () {

        it('false', function () {
            expect(cmd.not(false)).to.deep.equal([true]);
        });

        it('null', function () {
            expect(cmd.not(null)).to.deep.equal([true]);
        });

        it('undefined', function () {
            expect(cmd.not(undefined)).to.deep.equal([true]);
        });

    });

    describe('returns false for', function () {

        it('0', function () {
            expect(cmd.not(0)).to.deep.equal([false]);
        });

        it('1', function () {
            expect(cmd.not(1)).to.deep.equal([false]);
        });

        it('true', function () {
            expect(cmd.not(true)).to.deep.equal([false]);
        });

        it('""', function () {
            expect(cmd.not("")).to.deep.equal([false]);
        });

        it('{}', function () {
            expect(cmd.not({})).to.deep.equal([false]);
        });

    });

});
