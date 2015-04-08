(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: cmd.lt(2).with(1, 2, 3) === [false, false, true]
         *
         * @author Zikani Nyirenda Mwase
         */
        this.all = function (args, vals) {
            return vals.map(function (a) {
                return a < args;
            });
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].lt = {} : this);
