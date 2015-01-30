(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].push = {};
    }

    /**
     * Command: push(1)(2) === [2, 1]
     * @author Nate Ferrero
     */
    exports.all = function (args, vals) {
        return args.map(function (arg) {
            arg.push.apply(arg, vals);
        });
    };

})();
