(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: subtract(1)(5) - subtracts args from each value
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.forEach(function (arg) {
                val -= arg;
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].subtract = {} : this);
