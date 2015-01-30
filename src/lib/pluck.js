(function () {
    'use strict';

    /**
     * Command: pluck('color')({color: 'red'}) === ['red']
     *          pluck('color').raw({color: 'red'}) === 'red'
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

}).call(typeof module === 'undefined' ? this['cmd:lib'].pluck = {} : this);
