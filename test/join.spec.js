var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the join plugin
 */
cmd.use('join');

/**
 * Tests
 */
describe('cmd.join', function () {

    it('is a function', function () {
        expect(cmd.join).to.be.a('function');
    });

    it('joins values', function () {
        expect(cmd.join('::').with(0, 1, 2, 3, 4)).to.deep.equal([
            '0::1::2::3::4'
        ]);
    });

    it('joins values with multiple args', function () {
        expect(cmd.join('::', ', ').with(0, 1, 2, 3, 4)).to.deep.equal([
            '0::1::2::3::4',
            '0, 1, 2, 3, 4'
        ]);
    });

});
