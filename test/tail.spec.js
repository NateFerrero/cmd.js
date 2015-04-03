var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the tail plugin
 */
cmd.use('tail');

/**
 * Tests
 */
describe('cmd.tail', function () {

    it('is a function', function () {
        expect(cmd.tail).to.be.a('function');
    });

    it('returns last two values', function () {
        expect(cmd.tail(2).with(1, 2, 3)).to.deep.equal([2, 3]);
    });

    it('returns last value when negative argument was given', function () {
        expect(cmd.tail(-2).with(1, 2, 3)).to.deep.equal([3]);
    });

    it('returns all the values if number is bigger than amount of arguments', function () {
        expect(cmd.tail(100).with(1, 2, 3)).to.deep.equal([1, 2, 3]);
    });

    it('returns all the values if no argument was given', function () {
        expect(cmd.tail().with(1, 2, 3)).to.deep.equal([1, 2, 3]);
    });

    it('ignores extra arguments', function () {
        expect(cmd.tail(1, 2).with(1, 2, 3)).to.deep.equal([3]);
    });

});
