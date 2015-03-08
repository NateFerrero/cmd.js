var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the sum plugin
 */
cmd.use('sum');

/**
 * Tests
 */
describe('cmd.sum', function () {

    it('is a function', function () {
        expect(cmd.sum).to.be.an('object');
    });

    it('returns the sum of values', function () {
        expect(cmd.sum.with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(55);
    });

});
