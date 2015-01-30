(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].upper = {};
    }

    /**
     * Command: upper('a') === ['A']
     * @author Nate Ferrero
     */
    exports.args = [];
    exports.each = function (args, val) {
        return ('' + val).toUpperCase();
    };

})();
