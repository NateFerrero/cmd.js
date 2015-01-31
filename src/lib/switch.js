(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: switch(function (when, val) {
         *   when(val == 1, function () { return 'a'; });
         *   when(val == 2, function () { return 'b'; });
         *   when(val >= 3, function () { return 'c'; });
         * })(1, 2, 3) === ['a', 'b', 'c']
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            var cond = args[0];
            if (typeof cond !== 'function') {
                throw new Error('cmd.switch(function (when, x) { ... }) called without function as first argument');
            }

            var when = function (condition, result) {
                if (condition) {
                    throw {
                        name: 'ConditionMatched',
                        result: typeof result === 'function' ? result() : result
                    };
                }
            };

            try {
                cond(when, val);
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
}).call(typeof module === 'undefined' ? this['cmd:lib'].switch = {} : this);
