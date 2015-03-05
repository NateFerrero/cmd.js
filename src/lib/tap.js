(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: tap(function (x) { return 2 * x + 1; })(1, 2, 3, 4, 5) - returns [3, 5, 7, 9, 11]
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.forEach(function (arg) {
                val = arg(val);
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].tap = {} : this);
