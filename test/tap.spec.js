var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the tap plugin
 */
cmd.use('tap');

/**
 * Tests
 */
describe('cmd.tap', function () {

    it('is a function', function () {
        expect(cmd.tap).to.be.a('function');
    });

    it('alters a value in the stream', function () {
        expect(cmd.tap(function (x) { return 2 * x + 1; }).with(1, 2, 3, 4, 5)).to.deep.equal([3, 5, 7, 9, 11]);
    });

});
