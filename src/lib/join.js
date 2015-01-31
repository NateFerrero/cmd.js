(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: join('-')(1, 2, 3) === ['1-2-3']
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            return args.map(function (arg) {
                return vals.join(arg);
            });
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].join = {} : this);
