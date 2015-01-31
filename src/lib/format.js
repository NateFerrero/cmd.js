(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: format('a: {}')('A') === ['a: A']
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            return args.map(function (arg) {
                vals.forEach(function (val) {
                    arg = arg.replace('{}', val);
                });
                return arg;
            });
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].format = {} : this);
