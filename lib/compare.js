/**
 * Command: compare(6, 3) === -1
 * @author Nate Ferrero
 */
cmd.all('compare', function (args, vals) {
    'use strict';
    var _a = vals[0];
    var _b = vals[1];

    var compare = function (a, b) {
        if (typeof a !== typeof b) {
            return typeof a < typeof b;
        }
        switch (typeof a) {
            case 'number':
                return a - b;
            case 'string':
            case 'boolean':
                return a < b;
            default:
                return 0;
        }
    };

    if (!Array.isArray(_a)) {
        return compare(_a, _b);
    }

    var result = 0;

    for (var i = 0; i < _a.length; i++) {
        result = compare(_a[i], _b[i]);
        if (result !== 0) {
            break;
        }
    }

    return result;
}, []);
