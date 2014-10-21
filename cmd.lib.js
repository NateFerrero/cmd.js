/**
 * Command: alert('a') - shows an alert
 * @author Nate Ferrero
 */
cmd.each('alert', function (args, val) {
    return alert(val);
}, []);

/**
 * Command: compare(6, 3) === -1
 * @author Nate Ferrero
 */
cmd.all('compare', function (args, vals) {
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

/**
 * Command: exists(null) === [false]
 *      exists.raw(null) === false
 * @author Nate Ferrero
 */
cmd.each('exists', function (args, val) {
    return val !== null && val !== undefined;
}, []);

/**
 * Command: filter(function (x) {
 *          return x >= 3;
 *      })(1, 2, 3) === [3]
 * @author Nate Ferrero
 */
cmd.all('filter', function (args, vals) {
    return vals.filter(function (val) {
        var len = args.length, i = -1;
        while (++i < len) {
            if (!(args[i].raw || args[i])(val)) {
                return false;
            }
        }
        return true;
    });
});

/**
 * Command: format('a: {}')('A') === ['a: A']
 * @author Nate Ferrero
 */
cmd.each('format', function (args, val) {
    return args.map(function (arg) {
        return arg.replace('{}', val);
    });
});

/**
 * Command: join('-')(1, 2, 3) === ['1-2-3']
 * @author Nate Ferrero
 */
cmd.all('join', function (args, vals) {
    return args.map(function (arg) {
        return vals.join(arg);
    });
});

/**
 * Command: log('a') - logs to console
 * @author Nate Ferrero
 */
cmd.each('log', function (args, val) {
    return console.log(val);
}, []);

/**
 * Command: logger(function (a) {
 *     return 10 * a;
 * }, 1)(1, 2, 3) - logs to console:
 * 10 1
 * 20 1
 * 30 1
 * @author Nate Ferrero
 */
cmd.each('logger', function (args, val) {
    var logs = [];
    args.forEach(function (arg) {
        var log = typeof arg === 'function' ? arg(val) : arg;
        Array.isArray(log) ? Array.prototype.push.apply(logs, log) :
            logs.push(log);
    });
    console.log.apply(console, logs);
    return val;
});

/**
 * Command: lower('A') === ['a']
 * @author Nate Ferrero
 */
cmd.each('lower', function (args, val) {
    return ('' + val).toLowerCase();
}, []);

/**
 * Command: obj('a', 'b')(1, 2) === [{a: 1, b: 2}]
 */
cmd.all('obj', function (args, vals) {
    var obj = {};
    args.forEach(function (arg, i) {
        if (i in vals) {
            obj[arg] = vals[i];
        }
    });
    return [obj];
});

/**
 * Command: pluck('color')({color: 'red'}) === ['red']
        pluck('color').raw({color: 'red'}) === 'red'
 * @author Nate Ferrero
 */
cmd.each('pluck', function (args, val) {
    var exists = cmd.exists.raw;
    args.forEach(function (arg) {
        if (exists(val)) {
            val = val[arg];
        }
    });
    return val;
});

/**
 * Command: push(1)(2) === [2, 1]
 * @author Nate Ferrero
 */
cmd.all('push', function (args, vals) {
    return args.map(function (arg) {
        arg.push.apply(arg, vals);
    });
});

/**
 * Command: sort(function (val) {
 *   return val;
 * })(3, 2, 1) === [1, 2, 3]
 * @author Nate Ferrero
 */
cmd.all('sort', function (args, vals) {
    return vals.sort(function (a, b) {
        if (!args.length) {
            return cmd.compare(a, b);
        }
        return cmd.compare(
            args.map(function (arg) {
                return arg(a);
            }),
            args.map(function (arg) {
                return arg(b);
            })
        );
    });
});

/**
 * Command: upper('a') === ['A']
 * @author Nate Ferrero
 */
cmd.each('upper', function (args, val) {
    return ('' + val).toUpperCase();
}, []);
