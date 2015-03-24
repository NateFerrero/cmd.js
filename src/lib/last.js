(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: last(1, 2, 3, 4, 5) - returns the last element of all values
         * @author Alexey Ershov
         */
        this.args = [];
        this.all = function (args, vals) {
            return vals[vals.length - 1];
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].last = {} : this);
