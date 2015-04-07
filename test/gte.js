var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the gte plugin
 */
cmd.use('gte');

/**
 * Tests
 */
describe('cmd.gte', function () {

    it('is a function', function () {
        expect(cmd.gte).to.be.a('function');
    });

    it('returns true for values that is greater or equal to the given argument', function () {
        expect(cmd.gte(3).with(3, 1, 5)).to.deep.equal([true, false, true]);
    });

    it('returns false if no argument was given', function () {
        expect(cmd.gte().with(1, 2, 3)).to.deep.equal([false, false, false]);
    });
});
