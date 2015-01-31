(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: sum(1, 2, 3, 4, 5) - returns the sum of all values
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            var sum = 0;
            for (var i = vals.length; i--;) {
                sum += vals[i];
            }
            return sum;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].sum = {} : this);
