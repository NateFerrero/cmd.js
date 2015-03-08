var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the equals plugin
 */
cmd.use('equals');

/**
 * Tests
 */
describe('cmd.equals', function () {

    it('is a function', function () {
        expect(cmd.equals).to.be.a('function');
    });

    it('returns true for equal values', function () {
        expect(cmd.equals(100).with(100)).to.deep.equal([true]);
    });

    it('returns false for different objects', function () {
        expect(cmd.equals({}).with({})).to.deep.equal([false]);
    });

    it('returns false for different arrays', function () {
        expect(cmd.equals([[]]).with([[]])).to.deep.equal([false]);
    });

});
