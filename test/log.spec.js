var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the log plugin
 */
cmd.use('log');

/**
 * Tests
 */
describe('cmd.log', function () {

    beforeEach(function () {
        cmd.$logInterface = {
            logs: [],
            log: function () {
                this.logs.push(Array.prototype.slice.call(arguments));
            }
        };
    });

    it('is a function', function () {
        expect(cmd.log).to.be.an('object');
    });

    it('log logs values', function () {
        cmd.log.with('log1', 'log2');
        cmd.log.with('log3', 'log4');

        expect(cmd.$logInterface.logs).to.deep.equal([
            ['log1'],
            ['log2'],
            ['log3'],
            ['log4']
        ]);
    });

});
