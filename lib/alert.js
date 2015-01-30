(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].alert = {};
    }

    /**
     * Command: alert('a') - shows an alert
     * @author Nate Ferrero
     */
    exports.args = [];
    exports.each = function (args, val) {
        return typeof alert === 'function' ? alert(val) : undefined;
    };

})();
