var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the filter plugin
 */
cmd.use('filter');

/**
 * Tests
 */
describe('cmd.filter', function () {

    it('is a function', function () {
        expect(cmd.filter).to.be.a('function');
    });

    it('filters values', function () {
        expect(cmd.filter(function (x) {
            return x % 2 == 0;
        }).with(0, 1, 2, 3, 4)).to.deep.equal([0, 2, 4]);
    });

    it('filters values over multiple arg passes', function () {
        expect(cmd.filter(function (x) {
            return x % 2 == 0;
        }, function (x) {
            return x !== 2;
        }).with(0, 1, 2, 3, 4)).to.deep.equal([0, 4]);
    });

});
