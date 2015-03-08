var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the count plugin
 */
cmd.use('count');

/**
 * Tests
 */
describe('cmd.count', function () {

    it('is a function', function () {
        expect(cmd.count).to.be.an('object');
    });

    it('counts the number of values given', function () {
        var num = cmd.count.with(1, [2, 3, 4], 5, [6]);
        expect(num).to.equal(6);
    });

});
