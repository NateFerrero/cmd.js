var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the product plugin
 */
cmd.use('product');

/**
 * Tests
 */
describe('cmd.product', function () {

    it('is a function', function () {
        expect(cmd.product).to.be.a('function');
    });

    it('returns the product of values', function () {
        expect(cmd.product(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(3628800);
    });

});
