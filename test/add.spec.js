var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the add plugin
 */
cmd.use('add');

/**
 * Tests
 */
describe('cmd.add', function () {

    it('is a function', function () {
        expect(cmd.add).to.be.a('function');
    });

    it('returns the sum of arguments plus each value', function () {
        expect(cmd.add(1, 2, 3).with(4, 40, 400)).to.deep.equal([10, 46, 406]);
    });

});
