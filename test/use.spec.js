var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Tests
 */
describe('cmd.use', function () {

    it('is a function', function () {
        expect(cmd.use).to.be.a('function');
    });

    it('can load all modules', function () {
        cmd.use('*');
    });

});
