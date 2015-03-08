var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the max plugin
 */
cmd.use('max');

/**
 * Tests
 */
describe('cmd.max', function () {

    it('is a function', function () {
        expect(cmd.max).to.be.an('object');
    });

    it('returns the max value', function () {
        expect(cmd.max.with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(10);
    });

});
