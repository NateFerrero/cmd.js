var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the lte plugin
 */
cmd.use('lte');

/**
 * Tests
 */
describe('cmd.lte', function () {

    it('is a function', function () {
        expect(cmd.lte).to.be.a('function');
    });

    it('returns true for values that is less than the given argument', function () {
        expect(cmd.lte(4).with(4, 1, 2, 5)).to.deep.equal([true, true, true, false]);
    });

    it('returns false if no argument was given', function () {
        expect(cmd.lte().with(1, 2, 3)).to.deep.equal([false, false, false]);
    });
});
