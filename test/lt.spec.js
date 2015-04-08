var cmd = require('../src/cmd.js');
var expect = require('chai').expect;

cmd.use('lt');

describe('cmd.lt', function () {

    it('is a function', function () {
        expect(cmd.lt).to.be.a('function');
    });

    it('evaluates the < comparison with numbers', function() {
        expect(cmd.lt(1).with(1, 2, 3)).to.deep.equal([false, false, false]);

        expect(cmd.lt(2).with(1, 2, 3)).to.deep.equal([true, false, false]);

        expect(cmd.lt(3).with(1, 2, 3)).to.deep.equal([true, true, false]);

        expect(cmd.lt(4).with(1, 2, 3)).to.deep.equal([true, true, true]);
    });

    it('evaluates comparison using string representation of numbers', function() {
        expect(cmd.lt('1').with(1, 2, 3)).to.deep.equal([false, false, false]);

        expect(cmd.lt('2').with(1, 2, 3)).to.deep.equal([true, false, false]);

        expect(cmd.lt('3').with(1, 2, 3)).to.deep.equal([true, true, false]);

        expect(cmd.lt('4').with(1, 2, 3)).to.deep.equal([true, true, true]);
    });
});
