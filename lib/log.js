(function () {
    'use strict';
    if (typeof exports === 'undefined') {
        exports = this['cmd:lib'].log = {};
    }

    /**
     * Command: log('a') - logs to console
     * @author Nate Ferrero
     */
    exports.args = [];
    exports.each = function (args, val) {
        return console.log(val);
    };

})();
