(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: count(1, [2, 3]) === 3
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            return vals.length;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].count = {} : this);
