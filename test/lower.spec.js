var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the lower plugin
 */
cmd.use('lower');

/**
 * Tests
 */
describe('cmd.lower', function () {

    it('is a function', function () {
        expect(cmd.lower).to.be.a('function');
    });

    it('returns the lowercase value', function () {
        expect(cmd.lower('A normal looking sentence.')).to.deep.equal(['a normal looking sentence.']);
    });

});
