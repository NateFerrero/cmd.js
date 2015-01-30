(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].obj = {};
    }

    /**
     * Command: obj('a', 'b')(1, 2) === [{a: 1, b: 2}]
     * @author Nate Ferrero
     */
    exports.all = function (args, vals) {
        var obj = {};
        args.forEach(function (arg, i) {
            if (i in vals) {
                obj[arg] = vals[i];
            }
        });
        return [obj];
    };

})();
