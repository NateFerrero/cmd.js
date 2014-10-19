/**
 * cmd: cmd(function () { ... })
 * @author Nate Ferrero
 */
var cmd = function (name, fn) {
    if (debug) console.debug('cmd()', arguments);

    if (typeof fn !== 'function') {
        throw new Error('cmd(name, fn), fn was not a function, got ' + typeof fn);
    }
    return cmd.argsFn(name, false, null, fn);
};

cmd.each = function (name, fn) {
    if (debug) console.debug('cmd.each()', arguments);

    if (typeof fn !== 'function') {
        throw new Error('cmd.each(name, fn), fn was not a function, got ' + typeof fn);
    }
    return cmd.argsFn(name, true, null, fn);
};

cmd.argsFn = function (name, each, first, then) {
    if (debug) console.debug('cmd.argsFn()', arguments);

    var aFn = function (/* args */) {
        var args = Array.prototype.slice.apply(arguments);
        return cmd.valsFn(name, first, function (vals) {
            return each ? vals.map(function (val) {
                return then(args, val);
            }) : then(args, vals);
        });
    };

    aFn.__defineGetter__('cmd', function () {
        throw new Error('cmd.chain can only be used after args are provided for cmd.' + name);
    });

    aFn.$each = each;
    aFn.$cmd = name;
    aFn.$cmdArgs = true;
    return aFn;
};

cmd.valsFn = function (name, first, then) {
    if (debug) console.debug('cmd.valsFn()', arguments);

    var vFn = function (/* vals */) {
        if (debug) console.debug('vFn', name, arguments);

        var vals = [];
        Array.prototype.slice.apply(arguments).forEach(function (val) {
            if (Array.isArray(val)) {
                vals.push.apply(vals, val);
            }
            else {
                vals.push(val);
            }
        });

        if (first) {
            vals = first.apply(null, vals);
        }

        return then(vals);
    };

    vFn.raw = function (val) {
        if (debug) console.debug('vFn.raw()', arguments);

        return first ? then(first([val])) : then([val]);
    };

    vFn.__defineGetter__('cmd', function () {
        if (debug) console.debug('.cmd', arguments);

        return cmd.chain(vFn);
    });

    vFn.$cmd = name;
    vFn.$cmdVals = true;
    return vFn;
};

cmd.chain = function (first) {
    if (debug) console.debug('cmd.chain()', arguments);

    var chain = {};
    Object.keys(cmd).forEach(function (key) {
        chain.__defineGetter__(key, function () {
            var next = cmd[key];
        
            if (next.$cmdArgs) {
                return cmd.argsFn(next.$cmd, next.$each, first, function (args) {
                    if (debug) console.debug('chain > cmd.argsFn > callback()', arguments);

                    return next.apply(null, args);
                });
            }
            
            else if (next.$cmdVals) {
                return cmd.valsFn(next.$cmd, next.$each, first, function () {
                    if (debug) console.debug('chain > cmd.valsFn > callback()', arguments);

                    return next.apply(null, arguments);
                });
            }

            else {
                throw new Error('Invalid cmd.chain');
            }
        });
    });

    return chain;
};

/**
 * cmd.each(...) causes the function to be run on each value
 */

/**
 * cmd: upper('a') === ['A']
 */
cmd.upper = cmd.each('upper', function (args, val) {
    return ('' + val).toUpperCase();
})();

/**
 * cmd: lower('a') === ['A']
 */
cmd.lower = cmd.each('lower', function (args, val) {
    return ('' + val).toLowerCase();
})();

/**
 * cmd: exists(null) === [false]
 *      exists.raw(null) === false
 * @author Nate Ferrero
 */
cmd.exists = cmd.each('exists', function (args, val) {
    return val !== null && val !== undefined;
})();

/**
 * cmd: pluck('color')({color: 'red'}) === ['red']
        pluck('color').raw({color: 'red'}) === 'red'
 * @author Nate Ferrero
 */
cmd.pluck = cmd.each('pluck', function (args, val) {
    var exists = cmd.exists.raw;
    args.forEach(function (arg) {
        if (exists(val)) {
            val = val[arg];
        }
    });
    return val;
});

/**
 * cmd(...) causes the function to be run on the values array
 */

/**
 * cmd: push(1)(2) === [2, 1]
 * @author Nate Ferrero
 */
cmd.push = cmd('push', function (args, vals) {
    vals.push.apply(vals, args);
    return vals;
});

/**
 * cmd: join('-')(1, 2, 3) === ['1-2-3']
 * @author Nate Ferrero
 */
cmd.join = cmd('join', function (args, vals) {
    return args.map(function (arg) {
        return vals.join(arg);
    });
});

/**
 * cmd: filter(function (x) {
 *          return x >= 3;
 *      })(1, 2, 3) === [3]
 * @author Nate Ferrero
 */
cmd.filter = cmd('filter', function (args, vals) {
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

var debug = true //&& false;
