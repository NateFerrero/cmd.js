/**
 * Command: alert('a') - shows an alert
 * @author Nate Ferrero
 */
cmd.each('alert', function (args, val) {
    return alert(val);
}, []);

/**
 * Command: log('a') - logs to console
 * @author Nate Ferrero
 */
cmd.each('log', function (args, val) {
    return console.log(val);
}, []);

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
 * Command: upper('a') === ['A']
 * @author Nate Ferrero
 */
cmd.each('upper', function (args, val) {
    return ('' + val).toUpperCase();
}, []);

/**
 * Command: lower('A') === ['a']
 * @author Nate Ferrero
 */
cmd.each('lower', function (args, val) {
    return ('' + val).toLowerCase();
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
 * Command: push(1)(2) === [2, 1]
 * @author Nate Ferrero
 */
cmd.all('push', function (args, vals) {
    return args.map(function (arg) {
        arg.push.apply(arg, vals);
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
