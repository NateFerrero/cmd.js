(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Command: push.to([1])(2) -> [1, 2]
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            return args.map(function (arg) {
                arg.push.apply(arg, vals);
            });
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].push = {} : this);
