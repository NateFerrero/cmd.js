(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: push.to([1])(2) -> [1, 2]
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            args.map(function (arg) {
                arg.push(val);
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].push = {} : this);
