(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: multiply(1)(5) - multiplies each value by all args
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.forEach(function (arg) {
                val *= arg;
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].multiply = {} : this);
