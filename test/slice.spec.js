var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the slice plugin
 */
cmd.use('slice');

/**
 * Tests
 */
describe('cmd.slice', function () {

    it('is a function', function () {
        expect(cmd.slice).to.be.a('function');
    });

    it('returns a portion of an array', function () {
        expect(cmd.slice(1, 2).with(1, 2, 3)).to.deep.equal([2]);
    });
});
