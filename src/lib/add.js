(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: add(1)(5) - adds args to each value
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.forEach(function (arg) {
                val += arg;
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].add = {} : this);
