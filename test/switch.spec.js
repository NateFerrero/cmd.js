var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the switch plugin
 */
cmd.use('switch');

/**
 * Tests
 */
describe('cmd.switch', function () {

    it('is a function', function () {
        expect(cmd.switch).to.be.a('function');
    });

    var msgSwitch = cmd.switch(function (when, x) {
        when(x > 5,     'You have lots of messages');
        when(x === 5,   'You have five messages');
        when(x > 1,     'You have a few messages');
        when(x === 1,   'You have a message');
        when(x === 0,   'You have no messages');
        when(true,      'Unknown');
    });

    it('switches based on value', function () {
        expect(msgSwitch(5)).to.deep.equal(['You have five messages']);
    });

    it('returns default when no match', function () {
        expect(msgSwitch('failure')).to.deep.equal(['Unknown']);
    });

});
