var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the upper plugin
 */
cmd.use('upper');

/**
 * Tests
 */
describe('cmd.upper', function () {

    it('is a function', function () {
        expect(cmd.upper).to.be.a('function');
    });

    it('returns the uppercase value', function () {
        expect(cmd.upper('A normal looking sentence.')).to.deep.equal(['A NORMAL LOOKING SENTENCE.']);
    });

});
