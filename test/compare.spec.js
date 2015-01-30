var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the compare plugin
 */
cmd.use('compare');

/**
 * Tests
 */
describe('cmd.compare', function () {

    it('is a function', function () {
        expect(cmd.compare).to.be.a('function');
    });

    it('compares 0 and 1 as -1', function () {
        expect(cmd.compare(0, 1)).to.equal(-1);
    });

    it('compares 1 and 0 as 1', function () {
        expect(cmd.compare(1, 0)).to.equal(1);
    });

    it('compares 1 and 1 as 0', function () {
        expect(cmd.compare(1, 1)).to.equal(0);
    });

    it('compares "a" and "b" as -1', function () {
        expect(cmd.compare("a", "b")).to.equal(-1);
    });

    it('compares "b" and "a" as 1', function () {
        expect(cmd.compare("b", "a")).to.equal(1);
    });

    it('compares "a" and "a" as 0', function () {
        expect(cmd.compare("a", "a")).to.equal(0);
    });

    it('compares functions as 0', function () {
        expect(cmd.compare(function () {}, function () {})).to.equal(0);
    });

    it('compares differing types as the type names', function () {
        //            'boolean', 'function'
        expect(cmd.compare(true, function () {})).to.equal(-1);
    });

    it('compares arrays based on values in order', function () {
        expect(cmd.compare([0, 1, 2], [0, 1, 3])).to.equal(-1);
        expect(cmd.compare([0, 1, 2], [0, 1, 2])).to.equal(0);
        expect(cmd.compare([0, 1, 3], [0, 1, 2])).to.equal(1);
    });

});
