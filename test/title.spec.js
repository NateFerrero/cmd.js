var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the title plugin
 */
cmd.use('title');

/**
 * Tests
 */
describe('cmd.title', function () {

    it('is a function', function () {
        expect(cmd.title).to.be.a('function');
    });

    it('returns the titlecase value', function () {
        expect(cmd.title('A normal looking sentence.')).to.deep.equal(['A Normal Looking Sentence.']);
    });

});
