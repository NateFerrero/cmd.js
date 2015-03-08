var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the min plugin
 */
cmd.use('min');

/**
 * Tests
 */
describe('cmd.min', function () {

    it('is a function', function () {
        expect(cmd.min).to.be.an('object');
    });

    it('returns the min value', function () {
        expect(cmd.min.with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(1);
    });

});
