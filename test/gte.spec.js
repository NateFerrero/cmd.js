var cmd = require('../src/cmd.js');
var expect = require('chai').expect;

cmd.use('gte');

describe('cmd.gte', function () {

    it('is a function', function () {
        expect(cmd.gte).to.be.a('function');
    });

    it('evaluates the >= comparison with numbers', function() {
        expect(cmd.gte(1).with(1, 2, 3)).to.deep.equal([true, true, true]);

        expect(cmd.gte(2).with(1, 2, 3)).to.deep.equal([false, true, true]);

        expect(cmd.gte(3).with(1, 2, 3)).to.deep.equal([false, false, true]);

        expect(cmd.gte(4).with(1, 2, 3)).to.deep.equal([false, false, false]);
    });

    it('evaluates comparison using string representation of numbers', function() {
        expect(cmd.gte('1').with(1, 2, 3)).to.deep.equal([true, true, true]);
        expect(cmd.gte('2').with(1, 2, 3)).to.deep.equal([false, true, true]);

        expect(cmd.gte('3').with(1, 2, 3)).to.deep.equal([false, false, true]);

        expect(cmd.gte('4').with(1, 2, 3)).to.deep.equal([false, false, false]);
    });
});
