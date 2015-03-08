var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the multiply plugin
 */
cmd.use('multiply');

/**
 * Tests
 */
describe('cmd.multiply', function () {

    it('is a function', function () {
        expect(cmd.multiply).to.be.a('function');
    });

    it('returns the sum of arguments plus each value', function () {
        expect(cmd.multiply(1, 2, 3).with(4, 40, 400)).to.deep.equal([24, 240, 2400]);
    });

});
