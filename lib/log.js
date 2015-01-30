(function () {
    'use strict';

    /**
     * Command: log('a') - logs to console
     * @author Nate Ferrero
     */
    this.args = [];
    this.each = function (args, val) {
        return console.log(val);
    };

}).call(typeof module === 'undefined' ? this['cmd:lib'].log = {} : this);
