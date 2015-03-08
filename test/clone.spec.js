var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the clone plugin
 */
cmd.use('clone');

/**
 * Tests
 */
describe('cmd.clone', function () {

    it('is a function', function () {
        expect(cmd.clone).to.be.an('object');
    });

    it('clones an object', function () {
        var source = {a: 5, b: [1, 2, 3]};
        var cloned = cmd.clone.raw(source);
        expect(source).to.not.equal(cloned);
        expect(source).to.deep.equal(cloned);
    });

    it('clones a date', function () {
        var source = new Date();
        var cloned = cmd.clone.raw(source);
        expect(source).to.not.equal(cloned);
        expect(source.getTime()).to.equal(cloned.getTime());
    });

});
