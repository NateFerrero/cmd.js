(function () {
    'use strict';

    /**
     * Command: push(1)(2) === [2, 1]
     * @author Nate Ferrero
     */
    this.all = function (args, vals) {
        return args.map(function (arg) {
            arg.push.apply(arg, vals);
        });
    };

}).call(typeof module === 'undefined' ? this['cmd:lib'].push = {} : this);
