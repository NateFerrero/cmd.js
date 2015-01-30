(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].format = {};
    }

    /**
     * Command: format('a: {}')('A') === ['a: A']
     * @author Nate Ferrero
     */
    exports.all = function (args, vals) {
        return args.map(function (arg) {
            vals.forEach(function (val) {
                arg = arg.replace('{}', val);
            });
            return arg;
        });
    };

})();
