(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: lte(3) - returns true for each value less than or equal to an argument provided
         * @author Alexey Ershov
         */
        this.each = function (args, val) {
            for (var i = 0; i < args.length; i++) {
                if (val <= args[i]) {
                    return true;
                }
            }
            return false;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].lte = {} : this);
