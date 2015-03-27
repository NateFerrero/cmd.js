var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the first plugin
 */
cmd.use('first');

/**
 * Tests
 */
describe('cmd.first', function () {

    it('is a function', function () {
        expect(cmd.first).to.be.an('object');
    });

    it('returns the first element of values given', function () {
        var num = cmd.first.with(1, [2, 3, 4], 5, [6]);
        expect(num).to.equal(1);
    });

    it ('returns undefined if no values given', function () {
        var num = cmd.first.with();
        expect(num).to.equal(undefined);
    });

});
