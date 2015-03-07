(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Unique reference
         */
        cmd.it = {};

        /**
         * Command: call('toPrecision', 3)(4) === [4.00]
         *      call('toPrecision', 3).raw(4) === 4.00
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            if (typeof args[0] === 'string') {
                return val[args[0]].apply(val, args.slice(1));
            }

            else if (typeof args[0] === 'function') {
                return args[0].apply(null, args.slice(1).map(function (x) {
                    return x === cmd.it ? val : x;
                }));
            }

            else {
                throw new Error('First argument must be a string or a function');
            }
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].call = {} : this);
