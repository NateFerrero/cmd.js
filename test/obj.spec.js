var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the obj plugin
 */
cmd.use('obj');

/**
 * Tests
 */
describe('cmd.obj', function () {

    it('is a function', function () {
        expect(cmd.obj).to.be.a('function');
    });

    it('creates an object with keys and values', function () {
        expect(cmd.obj('a', 'b', 'c').with(1, 2, 3)).to.deep.equal([
            {a: 1, b: 2, c: 3}
        ]);
    });

});
