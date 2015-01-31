var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the pluck plugin
 */
cmd.use('pluck');

/**
 * Tests
 */
describe('cmd.pluck', function () {

    it('is a function', function () {
        expect(cmd.pluck).to.be.a('function');
    });

    it('pluck plucks values', function () {
        expect(cmd.pluck('a')({a: 1}, {a: 2}, {a: 3})).to.deep.equal([
            1, 2, 3
        ]);
    });

    it('pluck plucks deep values', function () {
        expect(cmd.pluck('a', 'b', 'c')({a: {b: {c: 1}}}, {a: {b: {c: 2}}}, {a: {b: {c: 3}}})).to.deep.equal([
            1, 2, 3
        ]);
    });

    it('pluck plucks undefined when no values', function () {
        expect(cmd.pluck('a', 'b', 'c')({a: {b: {}}}, {a: {}}, {})).to.deep.equal([
            undefined, undefined, undefined
        ]);
    });

});
