var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the gt plugin
 */
cmd.use('gt');

/**
 * Tests
 */
describe('cmd.gt', function () {

    it('is a function', function () {
        expect(cmd.gt).to.be.a('function');
    });

    it('returns true for values that is greater than the given argument', function () {
        expect(cmd.gt(4).with(4, 1, 5)).to.deep.equal([false, false, true]);
    });

    it('returns false if no argument was given', function () {
        expect(cmd.gt().with(1, 2, 3)).to.deep.equal([false, false, false]);
    });
});
