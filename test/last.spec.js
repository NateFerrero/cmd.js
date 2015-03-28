var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the last plugin
 */
cmd.use('last');

/**
 * Tests
 */
describe('cmd.last', function () {

    it('is a function', function () {
        expect(cmd.last).to.be.an('object');
    });

    it('returns the last element of values given', function () {
        var num = cmd.last.with(1, [2, 3, 4], 5, 6);
        expect(num).to.equal(6);
    });

    it ('returns undefined if no values given', function () {
        var num = cmd.last.with();
        expect(num).to.equal(undefined);
    });

});
