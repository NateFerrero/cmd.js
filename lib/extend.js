/**
 * Command: extend({b: 2}, {c: 3})({a: 1}) === [{a: 1, b: 2, c: 3}]
 * Extends each val with each args
 * @author Nate Ferrero
 */
cmd.each('extend', function (args, val) {
    'use strict';
    args.forEach(function (arg) {
        Object.keys(arg).forEach(function (key) {
            if (arg.hasOwnProperty(key)) {
                val[key] = arg[key];
            }
        })
    })
    return val;
});
