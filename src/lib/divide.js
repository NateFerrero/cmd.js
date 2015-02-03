(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: divide(1)(5) - divides each value by all args
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.forEach(function (arg) {
                val /= arg;
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].divide = {} : this);
