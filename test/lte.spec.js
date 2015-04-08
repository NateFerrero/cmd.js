var cmd = require('../src/cmd.js');
var expect = require('chai').expect;

cmd.use('lte');

describe('cmd.lte', function () {

    it('is a function', function () {
        expect(cmd.lte).to.be.a('function');
    });

    it('evaluates the >= comparison with numbers', function() {
        expect(cmd.lte(1).with(1, 2, 3)).to.deep.equal([true, false, false]);

        expect(cmd.lte(2).with(1, 2, 3)).to.deep.equal([true, true, false]);

        expect(cmd.lte(3).with(1, 2, 3)).to.deep.equal([true, true, true]);

        expect(cmd.lte(4).with(1, 2, 3)).to.deep.equal([true, true, true]);
    });

    it('evaluates comparison using string representation of numbers', function() {
        expect(cmd.lte('1').with(1, 2, 3)).to.deep.equal([true, false, false]);

        expect(cmd.lte('2').with(1, 2, 3)).to.deep.equal([true, true, false]);

        expect(cmd.lte('3').with(1, 2, 3)).to.deep.equal([true, true, true]);

        expect(cmd.lte('4').with(1, 2, 3)).to.deep.equal([true, true, true]);
    });
});
