var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the reject plugin
 */
cmd.use('reject');

/**
 * Tests
 */
describe('cmd.reject', function () {

    it('is a function', function () {
        expect(cmd.reject).to.be.a('function');
    });

    it('rejects values', function () {
        expect(cmd.reject(function (x) {
            return x % 2 == 0;
        }).with(0, 1, 2, 3, 4)).to.deep.equal([1, 3]);
    });

    it('rejects values over multiple arg passes', function () {
        expect(cmd.reject(function (x) {
            return x % 2 == 0;
        }, function (x) {
            return x === 3;
        }).with(0, 1, 2, 3, 4)).to.deep.equal([1]);
    });

});
