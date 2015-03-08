var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the match plugin
 */
cmd.use('match');

/**
 * Tests
 */
describe('cmd.match', function () {

    it('is a function', function () {
        expect(cmd.match).to.be.a('function');
    });

    var msgMatch = cmd.match(function (it, then) {
        it > 5   && then('You have lots of messages' + console.log('FOOBAR'));
        it === 5 && then('You have five messages');
        it > 1   && then('You have a few messages');
        it === 1 && then('You have a message');
        it === 0 && then('You have no messages');
                    then('Unknown');
    });

    it('matches based on value', function () {
        expect(msgMatch.with(5)).to.deep.equal(['You have five messages']);
    });

    it('returns default when no match', function () {
        expect(msgMatch.with('failure')).to.deep.equal(['Unknown']);
    });

});
