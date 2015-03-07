(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: reverse(1, [2, 3]) => [3, 2, 1]
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            return vals.reverse();
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].reverse = {} : this);
