(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].lower = {};
    }

    /**
     * Command: lower('A') === ['a']
     * @author Nate Ferrero
     */
    exports.args = [];
    exports.lower = function (args, val) {
        return ('' + val).toLowerCase();
    };

})();

