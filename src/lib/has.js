(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: has('color')({color: 'red'}) === [true]
         *          has('color').raw({color: 'red'}) === true
         * @author Nate Ferrero
         */
        this.each = function (args, val) {
            for (var i in args) {
                if (val.hasOwnProperty(args[i])) {
                    val = val[args[i]];
                }
                else {
                    return false;
                }
            }
            return true;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].has = {} : this);
