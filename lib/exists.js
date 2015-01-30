(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].exists = {};
    }

    /**
     * Command: exists(null) === [false]
     *      exists.raw(null) === false
     * @author Nate Ferrero
     */
    exports.args = [];
    exports.each = function (args, val) {
        return val !== null && val !== undefined;
    };

})();
