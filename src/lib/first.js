(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: first(1, 2, 3, 4, 5) - returns the first element of all values
         * @author Alexey Ershov
         */
        this.args = [];
        this.all = function (args, vals) {
            return vals[0];
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].first = {} : this);
