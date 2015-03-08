var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the group plugin
 */
cmd.use('group');

/**
 * Tests
 */
describe('cmd.group', function () {

    it('is a function', function () {
        expect(cmd.group).to.be.a('function');
    });

    it('groups values into buckets of a particular size', function () {
        expect(cmd.group(2).with(1, 2, 3, 4)).to.deep.equal([
            [1, 2], [3, 4]
        ]);
    });

    it('groups values into buckets based on the result of a function', function () {
        expect(cmd.group(function (x) {
            return x > 2;
        }).with(1, 2, 3, 4)).to.deep.equal([
            [1, 2], [3, 4]
        ]);
    });

});
