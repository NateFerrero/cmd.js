var cmd = require('../src/cmd');
var expect = require('chai').expect;

/**
 * Tests
 */
describe('cmd.module', function () {

    it('is a function', function () {
        expect(cmd.module).to.be.a('function');
    });

    describe('creates an each command', function () {

        /**
         * Create an each plugin for testing
         */
        cmd.module('add', {
            each: function (args, val) {
                args.forEach(function (arg) {
                    val += arg;
                });
                return val
            }
        });

        it('called "add"', function () {
            expect(cmd.add).to.be.a('function');
        });

        it('works when no arguments are given', function () {
            expect(cmd.add()()).to.deep.equal([]);
        });

        it('works when multiple arguments and no values are given', function () {
            expect(
                cmd.add(1)()                          ).to.deep.equal([]);
            expect(
                cmd.add(1, 2, 3)()                    ).to.deep.equal([]);
            expect(
                cmd.add(1, [2, 3])()                  ).to.deep.equal([]);
            expect(
                cmd.add([1, 2, 3])()                  ).to.deep.equal([]);
            expect(
                cmd.add([1], [2], [3])()              ).to.deep.equal([]);
        });

        it('works when multiple values and no arguments are given', function () {
            expect(
                cmd.add()(1)                          ).to.deep.equal([1]);
            expect(
                cmd.add()(1, 2, 3)                    ).to.deep.equal([1, 2, 3]);
            expect(
                cmd.add()(1, [2, 3])                  ).to.deep.equal([1, 2, 3]);
            expect(
                cmd.add()([1, 2, 3])                  ).to.deep.equal([1, 2, 3]);
            expect(
                cmd.add()([1], [2], [3])              ).to.deep.equal([1, 2, 3]);
        });

        it('works when multiple values and multiple arguments are given', function () {
            expect(
                cmd.add(1)(1)                         ).to.deep.equal([2]);
            expect(
                cmd.add(1, 2, 3)(1, 2, 3)             ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add(1, [2, 3])(1, [2, 3])         ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add([1, 2, 3])([1, 2, 3])         ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add([1], [2], [3])([1], [2], [3]) ).to.deep.equal([7, 8, 9]);
        });

        it('.to does not merge argument arrays', function () {
            expect(
                cmd.add.to([1], [2], [3])([100], [200], [300])
            ).to.deep.equal(['100123', '200123', '300123']);
        });

        it('.to().raw function that returns the first value unwrapped', function () {
            expect(
                cmd.add.to([1], [2], [3]).raw([100], [200], [300])
            ).to.deep.equal('100123');
        });

        it('().raw function that returns the first value unwrapped', function () {
            expect(
                cmd.add([1], [2], [3]).raw([100], [200], [300])
            ).to.deep.equal(106);
        });
    });

    describe('creates an each command with args predefined', function () {

        /**
         * Create an each plugin for testing
         */
        cmd.module('add123', {
            each: function (args, val) {
                args.forEach(function (arg) {
                    val += arg;
                });
                return val
            },
            args: [1, 2, 3]
        });

        it('called "add123"', function () {
            expect(cmd.add123).to.be.a('function');
        });

        it('works when no values are given', function () {
            expect(cmd.add123()).to.deep.equal([]);
        });

        it('works when multiple values are given', function () {
            expect(
                cmd.add123(1)             ).to.deep.equal([7]);
            expect(
                cmd.add123(1, 2, 3)       ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add123(1, [2, 3])     ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add123([1, 2, 3])     ).to.deep.equal([7, 8, 9]);
            expect(
                cmd.add123([1], [2], [3]) ).to.deep.equal([7, 8, 9]);
        });

        it('.to operates directly on array values provided', function () {
            expect(
                cmd.add123.to([0, 0, 0])
            ).to.deep.equal(['0,0,0123']);
        });

        it('().raw function that returns the first value unwrapped', function () {
            expect(
                cmd.add123.raw([100], [200], [300])
            ).to.deep.equal(106);
            expect(
                cmd.add123.raw(100, 200, 300)
            ).to.deep.equal(106);
        });
    });

    describe('creates an each command with an available predefined argSet', function () {

        /**
         * Create an each plugin for testing
         */
        cmd.module('addnum', {
            each: function (args, val) {
                args.forEach(function (arg) {
                    val += arg;
                });
                return val
            },
            argSets: {
                _1: [1],
                _2: [2],
                _3: [1, 2]
            }
        });

        it('called "addnum"', function () {
            expect(cmd.addnum).to.be.a('function');
        });

        it('works when no values are given', function () {
            expect(cmd.addnum._1()).to.deep.equal([]);
            expect(cmd.addnum._2()).to.deep.equal([]);
            expect(cmd.addnum._3()).to.deep.equal([]);
        });

        it('works when multiple values are given', function () {
            expect(
                cmd.addnum._3(1)             ).to.deep.equal([4]);
            expect(
                cmd.addnum._3(1, 2, 3)       ).to.deep.equal([4, 5, 6]);
            expect(
                cmd.addnum._3(1, [2, 3])     ).to.deep.equal([4, 5, 6]);
            expect(
                cmd.addnum._3([1, 2, 3])     ).to.deep.equal([4, 5, 6]);
            expect(
                cmd.addnum._3([1], [2], [3]) ).to.deep.equal([4, 5, 6]);
        });

        it('.to operates directly on array values provided', function () {
            expect(
                cmd.addnum._3.to([0, 0, 0])
            ).to.deep.equal(['0,0,012']);
        });

        it('().raw function that returns the first value unwrapped', function () {
            expect(
                cmd.addnum._3.raw([100], [200], [300])
            ).to.deep.equal(103);
            expect(
                cmd.addnum._3.raw(100, 200, 300)
            ).to.deep.equal(103);
        });
    });

    describe('creates an all command', function () {

        /**
         * Create an all plugin for testing
         */
        cmd.module('interlace', {
            all: function (args, vals) {
                return vals.map(function (x) {
                    return typeof x === 'string' ? x : JSON.stringify(x);
                }).join(args.join(''));
            }
        });

        it('called "interlace"', function () {
            expect(cmd.interlace).to.be.a('function');
        });

        it('works when no arguments are given', function () {
            expect(cmd.interlace()()).to.deep.equal('');
        });

        it('works when multiple arguments and no values are given', function () {
            expect(
                cmd.interlace('a')()                 ).to.deep.equal('');
            expect(
                cmd.interlace('a', 'b', 'c')()       ).to.deep.equal('');
            expect(
                cmd.interlace('a', ['b', 'c'])()     ).to.deep.equal('');
            expect(
                cmd.interlace(['a', 'b', 'c'])()     ).to.deep.equal('');
            expect(
                cmd.interlace(['a'], ['b'], ['c'])() ).to.deep.equal('');
        });

        it('works when multiple values and no arguments are given', function () {
            expect(
                cmd.interlace()('a')                 ).to.deep.equal('a');
            expect(
                cmd.interlace()('a', 'b', 'c')       ).to.deep.equal('abc');
            expect(
                cmd.interlace()('a', ['b', 'c'])     ).to.deep.equal('abc');
            expect(
                cmd.interlace()(['a', 'b', 'c'])     ).to.deep.equal('abc');
            expect(
                cmd.interlace()(['a'], ['b'], ['c']) ).to.deep.equal('abc');
        });

        it('works when multiple values and multiple arguments are given', function () {
            expect(
                cmd.interlace('a')('A')                                 ).to.deep.equal('A');
            expect(
                cmd.interlace('a', 'b', 'c')('A', 'B', 'C')             ).to.deep.equal('AabcBabcC');
            expect(
                cmd.interlace('a', ['b', 'c'])('A', ['B', 'C'])         ).to.deep.equal('AabcBabcC');
            expect(
                cmd.interlace(['a', 'b', 'c'])(['A', 'B', 'C'])         ).to.deep.equal('AabcBabcC');
            expect(
                cmd.interlace(['a'], ['b'], ['c'])(['A'], ['B'], ['C']) ).to.deep.equal('AabcBabcC');
        });

        it('.to does not merge argument arrays', function () {
            expect(
                cmd.interlace.to(['a'], ['b'], ['c'])(['A'], ['B'], ['C'])
            ).to.deep.equal('AabcBabcC');
        });

        it('.to().raw is not defined for all-type commands', function () {
            expect(cmd.interlace.to(['a'], ['b'], ['c']).raw).to.not.be.defined;
        });

        it('().raw function should not be defined for all-type commands', function () {
            expect(cmd.interlace(['a'], ['b'], ['c']).raw).to.not.be.defined;
        });
    });

    describe('creates an all command with args predefined', function () {

        /**
         * Create an all plugin for testing
         */
        cmd.module('interlaceUnderscore', {
            all: function (args, vals) {
                return vals.map(function (x) {
                    return typeof x === 'string' ? x : JSON.stringify(x);
                }).join(args.join(''));
            },
            args: ['_']
        });

        it('called "interlaceUnderscore"', function () {
            expect(cmd.interlaceUnderscore).to.be.a('function');
        });

        it('works when no values are given', function () {
            expect(cmd.interlaceUnderscore()).to.deep.equal('');
        });

        it('works when multiple values are given', function () {
            expect(
                cmd.interlaceUnderscore('a')                 ).to.deep.equal('a');
            expect(
                cmd.interlaceUnderscore('a', 'b', 'c')       ).to.deep.equal('a_b_c');
            expect(
                cmd.interlaceUnderscore('a', ['b', 'c'])     ).to.deep.equal('a_b_c');
            expect(
                cmd.interlaceUnderscore(['a', 'b', 'c'])     ).to.deep.equal('a_b_c');
            expect(
                cmd.interlaceUnderscore(['a'], ['b'], ['c']) ).to.deep.equal('a_b_c');
        });

        it('.to operates directly on array values provided', function () {
            expect(
                cmd.interlaceUnderscore.to(['a', 'b', 'c'], ['d', 'e', 'f'])
            ).to.deep.equal('["a","b","c"]_["d","e","f"]');
        });

        it('().raw function should not be defined for all-type commands', function () {
            expect(cmd.interlaceUnderscore.raw).to.not.be.defined;
        });
    });

    describe('creates an all command with an available predefined argSet', function () {

        /**
         * Create an all plugin for testing
         */
        cmd.module('interlaceWith', {
            all: function (args, vals) {
                return vals.map(function (x) {
                    return typeof x === 'string' ? x : JSON.stringify(x);
                }).join(args.join(''));
            },
            argSets: {
                dash: ['-'],
                space: [' ']
            }
        });

        it('called "interlaceWith"', function () {
            expect(cmd.interlaceWith).to.be.a('function');
        });

        it('works when no values are given', function () {
            expect(cmd.interlaceWith.space()).to.deep.equal('');
            expect(cmd.interlaceWith.dash()).to.deep.equal('');
        });

        it('works when multiple values are given', function () {
            expect(
                cmd.interlaceWith.dash('a')                 ).to.deep.equal('a');
            expect(
                cmd.interlaceWith.dash('a', 'b', 'c')       ).to.deep.equal('a-b-c');
            expect(
                cmd.interlaceWith.dash('a', ['b', 'c'])     ).to.deep.equal('a-b-c');
            expect(
                cmd.interlaceWith.dash(['a', 'b', 'c'])     ).to.deep.equal('a-b-c');
            expect(
                cmd.interlaceWith.dash(['a'], ['b'], ['c']) ).to.deep.equal('a-b-c');
        });

        it('.to operates directly on array values provided', function () {
            expect(
                cmd.interlaceWith.dash.to(['a', 'b', 'c'], ['d', 'e', 'f'])
            ).to.deep.equal('["a","b","c"]-["d","e","f"]');
        });

        it('().raw function should not be defined for all-type commands', function () {
            expect(cmd.interlaceWith.dash.raw).to.not.be.defined;
        });
    });

});
