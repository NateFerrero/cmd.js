(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Command: get('color')({color: 'red'}) === ['red']
         *          get('color').raw({color: 'red'}) === 'red'
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            var exists = cmd.exists.raw;
            args.forEach(function (arg) {
                if (exists(val)) {
                    val = val[arg];
                }
            });
            return val;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].get = {} : this);
