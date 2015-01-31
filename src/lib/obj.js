(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: obj('a', 'b')(1, 2) === [{a: 1, b: 2}]
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            var obj = {};
            args.forEach(function (arg, i) {
                if (i in vals) {
                    obj[arg] = vals[i];
                }
            });
            return [obj];
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].obj = {} : this);
