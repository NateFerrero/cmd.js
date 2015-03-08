var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the get plugin
 */
cmd.use('get');

/**
 * Tests
 */
describe('cmd.get', function () {

    it('is a function', function () {
        expect(cmd.get).to.be.a('function');
    });

    it('get gets values', function () {
        expect(cmd.get('a').with({a: 1}, {a: 2}, {a: 3})).to.deep.equal([
            1, 2, 3
        ]);
    });

    it('get gets deep values', function () {
        expect(cmd.get('a', 'b', 'c').with({a: {b: {c: 1}}}, {a: {b: {c: 2}}}, {a: {b: {c: 3}}})).to.deep.equal([
            1, 2, 3
        ]);
    });

    it('get gets undefined when no values', function () {
        expect(cmd.get('a', 'b', 'c').with({a: {b: {}}}, {a: {}}, {})).to.deep.equal([
            undefined, undefined, undefined
        ]);
    });

});
