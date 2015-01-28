/**
 * Command: pluck('color')({color: 'red'}) === ['red']
        pluck('color').raw({color: 'red'}) === 'red'
 * @author Nate Ferrero
 */
cmd.each('pluck', function (args, val) {
    'use strict';
    var exists = cmd.exists.raw;
    args.forEach(function (arg) {
        if (exists(val)) {
            val = val[arg];
        }
    });
    return val;
});
