var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Load the push plugin
 */
cmd.use('push');

/**
 * Tests
 */
describe('cmd.push', function () {

    it('is a function', function () {
        expect(cmd.push).to.be.a('function');
    });

    it('push with .to to use raw args and avoid automerge', function () {
        var test = [1, 2, 3];
        cmd.push.to(test).with(4, 5, 6);
        expect(test).to.deep.equal([
            1, 2, 3, 4, 5, 6
        ]);
    });

    it('push two two arrays with .to to use raw args and avoid automerge', function () {
        var test1 = [1, 2, 3];
        var test2 = [9, 8, 7];
        cmd.push.to(test1, test2).with(4, 5, 6);
        expect(test1).to.deep.equal([
            1, 2, 3, 4, 5, 6
        ]);
        expect(test2).to.deep.equal([
            9, 8, 7, 4, 5, 6
        ]);
    });

    it('push with double wrapped array to avoid automerge', function () {
        var test = [1, 2, 3];
        cmd.push([test]).with(4, 5, 6);
        expect(test).to.deep.equal([
            1, 2, 3, 4, 5, 6
        ]);
    });

    it('push two two arrays with double wrapped array to avoid automerge', function () {
        var test1 = [1, 2, 3];
        var test2 = [9, 8, 7];
        cmd.push([test1, test2]).with(4, 5, 6);
        expect(test1).to.deep.equal([
            1, 2, 3, 4, 5, 6
        ]);
        expect(test2).to.deep.equal([
            9, 8, 7, 4, 5, 6
        ]);
    });

    it('push two two arrays with double wrapped individual arrays to avoid automerge', function () {
        var test1 = [1, 2, 3];
        var test2 = [9, 8, 7];
        cmd.push([test1], [test2]).with(4, 5, 6);
        expect(test1).to.deep.equal([
            1, 2, 3, 4, 5, 6
        ]);
        expect(test2).to.deep.equal([
            9, 8, 7, 4, 5, 6
        ]);
    });

});
