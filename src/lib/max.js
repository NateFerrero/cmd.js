(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: max(1, 2, 3, 4, 5) - returns the maximum value
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            return Math.max.apply(Math, vals);
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].max = {} : this);
