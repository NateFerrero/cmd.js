var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the format plugin
 */
cmd.use('format');

/**
 * Tests
 */
describe('cmd.format', function () {

    it('is a function', function () {
        expect(cmd.format).to.be.a('function');
    });

    it('formats values', function () {
        expect(cmd.format('One is {} and two is {}').with(1, 2)).to.deep.equal([
            'One is 1 and two is 2'
        ]);
    });

    it('formats values with multiple args', function () {
        expect(cmd.format('One is {} and two is {}', '{} + {} = {}').with(1, 2, 3)).to.deep.equal([
            'One is 1 and two is 2',
            '1 + 2 = 3'
        ]);
    });

});
