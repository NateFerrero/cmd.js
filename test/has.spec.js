var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the has plugin
 */
cmd.use('has');

/**
 * Tests
 */
describe('cmd.has', function () {

    it('is a function', function () {
        expect(cmd.has).to.be.a('function');
    });

    it('has returns true for valid properties', function () {
        expect(cmd.has('a').with({a: 1})).to.deep.equal([
            true
        ]);
    });

    it('has returns false for invalid properties', function () {
        expect(cmd.has('b').with({a: 1})).to.deep.equal([
            false
        ]);
    });

    it('has returns true for deep valid properties', function () {
        expect(cmd.has('a', 'length').with({a: 'something'}, {b: 'something'})).to.deep.equal([
            true, false
        ]);
    });

});
