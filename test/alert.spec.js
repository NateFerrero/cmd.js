var cmd = require('../cmd');
var expect = require('chai').expect;

/**
 * Load the alert plugin
 */
cmd.use('alert');

/**
 * Tests
 */
describe('cmd.alert', function () {

    it('is a function', function () {
        expect(cmd.alert).to.be.a('function');
    });

    it('returns [undefined]', function () {
        expect(cmd.alert('Test Alert')).to.deep.equal([undefined]);
    });

});
