(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: min(1, 2, 3, 4, 5) - returns the minimum value
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            return Math.min.apply(Math, vals);
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].min = {} : this);
