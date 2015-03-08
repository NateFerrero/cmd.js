var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the extend plugin
 */
cmd.use('extend');

/**
 * Tests
 */
describe('cmd.extend', function () {

    it('is a function', function () {
        expect(cmd.extend).to.be.a('function');
    });

    it('preserves the object reference', function () {
        var obj = {};
        expect(cmd.extend().with(obj)[0]).to.equal(obj);
    });

    it('returns an empty array when no values provided', function () {
        expect(cmd.extend({a: 1}, {b: 2}).with()).to.deep.equal([]);
    });

    it('extends a single value with an argument', function () {
        expect(cmd.extend({a: 1}).with({x: 2})).to.deep.equal([
            {a: 1, x: 2}
        ]);
    });

    it('extends each argument provided', function () {
        expect(cmd.extend({a: 1}, {b: 2}).with({x: 3})).to.deep.equal([
            {a: 1, b: 2, x: 3}
        ]);
    });

    it('extends each value provided', function () {
        expect(cmd.extend({a: 1}).with({x: 2}, {y: 3})).to.deep.equal([
            {a: 1, x: 2},
            {a: 1, y: 3}
        ]);
    });

    it('extends each argument and value provided', function () {
        expect(cmd.extend({a: 1}, {b: 2}).with({x: 3}, {y: 4})).to.deep.equal([
            {a: 1, b: 2, x: 3},
            {a: 1, b: 2, y: 4}
        ]);
    });

});
