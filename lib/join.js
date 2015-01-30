(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].join = {};
    }

    /**
     * Command: join('-')(1, 2, 3) === ['1-2-3']
     * @author Nate Ferrero
     */
    exports.all = function (args, vals) {
        return args.map(function (arg) {
            return vals.join(arg);
        });
    };

})();
