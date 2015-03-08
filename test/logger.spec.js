var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the logger plugin
 */
cmd.use('logger');

/**
 * Tests
 */
describe('cmd.logger', function () {

    beforeEach(function () {
        cmd.$loggerInterface = {
            logs: [],
            log: function () {
                this.logs.push(Array.prototype.slice.call(arguments));
            }
        };
    });

    it('is a function', function () {
        expect(cmd.logger).to.be.a('function');
    });

    it('logger logs values', function () {
        cmd.logger('log', function (x) {
            return x.toUpperCase();
        }).with('a', 'b', 'c');

        expect(cmd.$loggerInterface.logs).to.deep.equal([
            ['log', 'A'],
            ['log', 'B'],
            ['log', 'C']
        ]);
    });

});
