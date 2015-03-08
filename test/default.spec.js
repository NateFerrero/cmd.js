var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the default plugin
 */
cmd.use('default');

/**
 * Tests
 */
describe('cmd.default', function () {

    it('is a function', function () {
        expect(cmd.default).to.be.a('function');
    });

    it('returns the default arg in place of null or undefined', function () {
        expect(cmd.default(9).with(1, null, 3)).to.deep.equal([1, 9, 3]);
    });

});
