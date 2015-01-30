(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].pluck = {};
    }

    /**
     * Command: pluck('color')({color: 'red'}) === ['red']
     *          pluck('color').raw({color: 'red'}) === 'red'
     * @author Nate Ferrero
     */
    exports.each = function (args, val) {
        var exists = cmd.exists.raw;
        args.forEach(function (arg) {
            if (exists(val)) {
                val = val[arg];
            }
        });
        return val;
    };

})();
