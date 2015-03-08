var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the subtract plugin
 */
cmd.use('subtract');

/**
 * Tests
 */
describe('cmd.subtract', function () {

    it('is a function', function () {
        expect(cmd.subtract).to.be.a('function');
    });

    it('returns the sum of arguments plus each value', function () {
        expect(cmd.subtract(1, 2, 3).with(4, 40, 400)).to.deep.equal([-2, 34, 394]);
    });

});
