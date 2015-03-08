var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the reverse plugin
 */
cmd.use('reverse');

/**
 * Tests
 */
describe('cmd.reverse', function () {

    it('is a function', function () {
        expect(cmd.reverse).to.be.an('object');
    });

    it('returns the reverse of values', function () {
        expect(cmd.reverse.with(6, [5, 4, 3], 2, [1])).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

});
