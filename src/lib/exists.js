(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: exists(null) === [false]
         *      exists.raw(null) === false
         * @author Nate Ferrero
         */
        this.args = [];
        this.each = function (args, val) {
            return val !== null && val !== undefined;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].exists = {} : this);
