var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the view plugin
 */
cmd.use('view');

/**
 * Tests
 */
describe('cmd.view', function () {

    it('is a function', function () {
        expect(cmd.view).to.be.a('function');
    });

    it('currently does nothing under node', function () {
        expect(cmd.view()).to.deep.equal(undefined);
    });

});
