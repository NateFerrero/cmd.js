(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: match(function (when, val) {
         *   val == 1 && then('a');
         *   val == 2 && then('b');
         *   val >= 3 && then('c');
         * })(1, 2, 3) === ['a', 'b', 'c']
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            var cond = args[0];
            if (typeof cond !== 'function') {
                throw new Error('cmd.match(function (it, then) { ... }) called without function as first argument');
            }

            var then = function (result) {
                throw {
                    name: 'ConditionMatched',
                    result: typeof result === 'function' ? result() : result
                };
            };

            try {
                cond(val, then);
            }
            catch (e) {
                if (e.name === 'ConditionMatched') {
                    return e.result;
                }
                else {
                    throw e;
                }
            }
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].match = {} : this);
