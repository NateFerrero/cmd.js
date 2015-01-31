(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: product(1, 2, 3, 4, 5) - returns the product of all values
         * @author Nate Ferrero
         */
        this.args = [];
        this.all = function (args, vals) {
            var product = 1;
            for (var i = vals.length; i--;) {
                product *= vals[i];
            }
            return product;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].product = {} : this);
