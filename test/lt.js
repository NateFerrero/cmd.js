var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the lt plugin
 */
cmd.use('lt');

/**
 * Tests
 */
describe('cmd.lt', function () {

    it('is a function', function () {
        expect(cmd.lt).to.be.a('function');
    });

    it('returns true for values that is less than the given argument', function () {
        expect(cmd.lt(4).with(4, 1, 2, 5)).to.deep.equal([false, true, true, false]);
    });

    it('returns false if no argument was given', function () {
        expect(cmd.lt().with(1, 2, 3)).to.deep.equal([false, false, false]);
    });
});
