(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: equals(5)(5) === [true]
         *      equals(5).raw(5) === true
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            for (var i = 0; i < args.length; i++) {
                if (val === args[i]) {
                    return true;
                }
            }
            return false;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].equals = {} : this);
