var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the head plugin
 */
cmd.use('head');

/**
 * Tests
 */
describe('cmd.head', function () {

    it('is a function', function () {
        expect(cmd.head).to.be.a('function');
    });

    it('returns first two values', function () {
        expect(cmd.head(2).with(1, 2, 3)).to.deep.equal([1, 2]);
    });

    it('returns all the values if number is bigger than amount of arguments', function () {
        expect(cmd.head(100).with(1, 2, 3)).to.deep.equal([1, 2, 3]);
    });

    it('ignores extra arguments', function () {
        expect(cmd.head(1, 2).with(1, 2, 3)).to.deep.equal([1]);
    });

    it('returns an empty array if no arguments were provided', function () {
        expect(cmd.head().with(1, 2, 3)).to.deep.equal([]);
    });

});
