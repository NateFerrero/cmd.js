var cmd = require('../src/cmd.js');
var expect = require('chai').expect;

cmd.use('gt');

describe('cmd.gt', function () {

    it('is a function', function () {
        expect(cmd.gt).to.be.a('function');
    });

    it('evaluates the > comparison with numbers', function() {
        expect(cmd.gt(1).with(1, 2, 3)).to.deep.equal([false, true, true]);

        expect(cmd.gt(2).with(1, 2, 3)).to.deep.equal([false, false, true]);

        expect(cmd.gt(3).with(1, 2, 3)).to.deep.equal([false, false, false]);

        expect(cmd.gt(4).with(1, 2, 3)).to.deep.equal([false, false, false]);
    });

    it('evaluates comparison using string representation of numbers', function() {
        expect(cmd.gt('1').with(1, 2, 3)).to.deep.equal([false, true, true]);

        expect(cmd.gt('2').with(1, 2, 3)).to.deep.equal([false, false, true]);

        expect(cmd.gt('3').with(1, 2, 3)).to.deep.equal([false, false, false]);

        expect(cmd.gt('4').with(1, 2, 3)).to.deep.equal([false, false, false]);

    });
});
