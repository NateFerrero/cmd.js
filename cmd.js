/**
 * Command: Command(function () { ... })
 * @author Nate Ferrero
 */
var Command = function (context) {
    this.context = context;
};

/**
 * Global export
 */
var cmd = new Command();

/**
 * Command.all() causes the function to be called on an array of values
 * @author Nate Ferrero
 */
Command.prototype.all = function cmdAll (name, fn, args) {
    if (typeof fn !== 'function') {
        throw new Error('cmd.all(name, fn), fn was not a function, got ' + typeof fn);
    }

    Command.prototype.__defineGetter__(name, function () {

        if (Array.isArray(args)) {
            return this.getArgs(name, 'vals', function (vals) {
                return fn(args, vals);
            }.bind(this));
        };

        return this.getArgs(name, 'args', function (args) {
            return this.getArgs(name, 'vals', function (vals) {
                return fn(args, vals);
            }.bind(this));
        }.bind(this));
    });
};

/**
 * Command.each() causes the function to be called on each value
 * @author Nate Ferrero
 */
Command.prototype.each = function cmdEach (name, fn, args) {
    if (typeof fn !== 'function') {
        throw new Error('cmd.each(name, fn), fn was not a function, got ' + typeof fn);
    }

    Command.prototype.__defineGetter__(name, function () {

        if (Array.isArray(args)) {
            return this.getArgs(name, 'vals', function (vals) {
                return vals.map(function (val) {
                    return fn(args, val);
                });
            }.bind(this));
        };

        return this.getArgs(name, 'args', function (args) {
            return this.getArgs(name, 'vals', function (vals) {
                return vals.map(function (val) {
                    return fn(args, val);
                });
            }.bind(this));
        }.bind(this));
    });
};

/**
 * Command.getArgs()
 * @author Nate Ferrero
 */
Command.prototype.getArgs = function getArgsWrapper (name, purpose, done) {

    var getArgs = function getArgs () {
        var args = Array.prototype.slice.apply(arguments);

        if (purpose === 'vals') {
            var _args = [];
            args.forEach(function (arg) {
                Array.isArray(arg) ? Array.prototype.push.apply(_args, arg) :
                    _args.push(arg);
            });
            return done(_args);
        }

        return done(args);
    };

    getArgs.$name = name;
    getArgs.$purpose = purpose;

    if (purpose === 'vals') {
        getArgs.__defineGetter__('cmd', function () {
            return new Command(getArgs);
        });

        getArgs.raw = function () {
            var args = Array.prototype.slice.apply(arguments);
            var result = getArgs.apply(null, args);
            return result.shift();
        };

        if (this.context) {
            var context = this.context;
            return cmd.getArgs(name, 'vals', function (vals) {
                return getArgs.apply(null, context(vals));
            });
        }
    }

    return getArgs;
};
