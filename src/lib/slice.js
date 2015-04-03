(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: slice(1, 2) - returns a section of an array
         * @author Alexey Ershov
         */
        this.all = function (args, vals) {
            var slice = Array.prototype.slice;
            return slice.apply(vals, args);
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].slice = {} : this);
