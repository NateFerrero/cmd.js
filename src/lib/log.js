(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Command: log('a') - logs to console
         * @author Nate Ferrero
         */
        this.args = [];
        this.each = function (args, val) {
            if (cmd.$logInterface) {
                cmd.$logInterface.log.call(cmd.$logInterface, val);
            }
            else {
                console.log(val);
            }
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].log = {} : this);
