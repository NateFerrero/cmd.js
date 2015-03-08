var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the sort plugin
 */
cmd.use('sort');

/**
 * Tests
 */
describe('cmd.sort', function () {

    it('is a function', function () {
        expect(cmd.sort).to.be.a('function');
    });

    it('asc is a function', function () {
        expect(cmd.sort.asc).to.be.an('object');
    });

    it('desc is a function', function () {
        expect(cmd.sort.desc).to.be.an('object');
    });

    it('returns numeric array unsorted with 0', function () {
        expect(cmd.sort(0).with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(
            [2, 4, 6, 8, 10, 9, 7, 5, 3, 1]
        );
    });

    it('returns numeric array sorted in ascending order with 1', function () {
        expect(cmd.sort(1).with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );
    });

    it('returns numeric array sorted in descending order with -1', function () {
        expect(cmd.sort(-1).with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        );
    });

    it('returns numeric array sorted in ascending order', function () {
        expect(cmd.sort.asc.with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );
    });

    it('returns numeric array sorted in descending order', function () {
        expect(cmd.sort.desc.with(2, 4, 6, 8, 10, 9, 7, 5, 3, 1)).to.deep.equal(
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        );
    });

    it('returns alpha array sorted in ascending order', function () {
        expect(cmd.sort.asc.with('b', 'd', 'f', 'h', 'j', 'i', 'g', 'e', 'c', 'a')).to.deep.equal(
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
        );
    });

    it('returns alpha array sorted in descending order', function () {
        expect(cmd.sort.desc.with('b', 'd', 'f', 'h', 'j', 'i', 'g', 'e', 'c', 'a')).to.deep.equal(
            ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
        );
    });

});
