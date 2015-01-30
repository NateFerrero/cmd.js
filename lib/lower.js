(function () {
    'use strict';

    /**
     * Command: lower('A') === ['a']
     * @author Nate Ferrero
     */
    this.args = [];
    this.each = function (args, val) {
        return ('' + val).toLowerCase();
    };

}).call(typeof module === 'undefined' ? this['cmd:lib'].lower = {} : this);

