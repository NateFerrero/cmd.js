(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: head(2) - returns first values
         * @author Alexey Ershov
         */
        this.all = function (args, vals) {
            var slice = Array.prototype.slice;
            args = slice.call(args, 0, 1);
            return slice.call(vals, 0, args);
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].head = {} : this);
