(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: not('red') === [false]
         *      not.raw('red') === false
         * @author Nate Ferrero
         */
        this.args = [];
        this.each = function (args, val) {
            return val === false || val === null || val === undefined;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].not = {} : this);
