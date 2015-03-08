var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the divide plugin
 */
cmd.use('divide');

/**
 * Tests
 */
describe('cmd.divide', function () {

    it('is a function', function () {
        expect(cmd.divide).to.be.a('function');
    });

    it('returns the sum of arguments plus each value', function () {
        expect(cmd.divide(1, 2, 3).with(6, 60, 600)).to.deep.equal([1, 10, 100]);
    });

});
