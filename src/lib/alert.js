(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: alert('a') - shows an alert
         * @author Nate Ferrero
         */
        this.args = [];
        this.each = function (args, val) {
            return typeof alert === 'function' ? alert(val) : undefined;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].alert = {} : this);
