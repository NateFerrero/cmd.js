(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].filter = {};
    }

    /**
     * Command: filter(function (x) {
     *          return x >= 3;
     *      })(1, 2, 3) === [3]
     * @author Nate Ferrero
     */
    exports.all = function (args, vals) {
        return vals.filter(function (val) {
            var len = args.length;
            var i = -1;
            while (++i < len) {
                if (!(args[i].raw || args[i])(val)) {
                    return false;
                }
            }
            return true;
        });
    };

})();
