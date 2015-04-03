(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: head(2) - returns the first number of values
         * @author Alexey Ershov
         */
        this.all = function (args, vals) {
            var slice = Array.prototype.slice;
            args = slice.call(args, 0, 1);

            if (args.length === 0) {
                return vals;
            }

            return slice.call(vals, 0, args);
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].head = {} : this);
