(function () {
    'use strict';

    /**
     * Command: logger(function (a) {
     *     return 10 * a;
     * }, 1)(1, 2, 3) - logs to console:
     * 10 1
     * 20 1
     * 30 1
     * @author Nate Ferrero
     */
    this.each = function (args, val) {
        var logs = [];
        args.forEach(function (arg) {
            var log = typeof arg === 'function' ? arg(val) : arg;
            if (Array.isArray(log)) {
                Array.prototype.push.apply(logs, log);
            }
            else {
                logs.push(log);
            }
        });
        console.log.apply(console, logs);
        return val;
    };

}).call(typeof module === 'undefined' ? this['cmd:lib'].logger = {} : this);

