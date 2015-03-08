var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the call plugin
 */
cmd.use('call');

/**
 * Tests
 */
describe('cmd.call', function () {

    it('is a function', function () {
        expect(cmd.call).to.be.a('function');
    });

    it('invokes the specified method on each value with given arguments', function () {
        expect(cmd.call('toPrecision', 3).with(1, 10, 100)).to.deep.equal(['1.00', '10.0', '100']);
    });

    it('respects the positioning of cmd.it within the given arguments', function () {
        expect(cmd.call(Math.pow, 2, cmd.it).with(1, 2, 3)).to.deep.equal([2, 4, 8]);
        expect(cmd.call(Math.pow, cmd.it, 2).with(1, 2, 3)).to.deep.equal([1, 4, 9]);
    });
});
