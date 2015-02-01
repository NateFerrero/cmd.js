/**
 * Command: new Command(function () { ... })
 * @author Nate Ferrero
 */
(function () {
    'use strict';

    var scope = this;

    /**
     * Command class
     */
    var Command = function (context) {
        this.context = context;
    };

    /**
     * Command.use() loads plugins
     */
    Command.prototype.use = function () {
        var self = this;
        Array.prototype.forEach.call(arguments, function (name) {
            if (name === '*') {
                var libs = [
                    'alert', 'case', 'clone', 'compare', 'exists', 'extend', 'filter', 'format', 'join',
                    'log', 'logger', 'max', 'min', 'obj', 'pluck', 'product',
                    'push', 'sort', 'sum', 'switch'
                ];
                return libs.forEach(function (name) {
                    self.use(name);
                });
            }

            /**
             * Load via require for Node or from window for browser
             */
            var mod = typeof module === 'object' ? require('./lib/' + name) : scope['cmd:lib'][name];

            if (!mod || typeof mod !== 'object') {
                throw new Error('cmd.js module ' + name + ' is not available');
            }

            /**
             * Register the module scope as cmd.name
             */
            self.module(name, mod);
        });
    };

    /**
     * Command.module(name, mod) registers a new module as cmd.name
     */
    Command.prototype.module = function (name, mod) {
        if (mod.export) {
            mod.export(this);
        }
        if (mod.all) {
            this.all(name, mod.all, mod);
        }
        else if (mod.each) {
            this.each(name, mod.each, mod);
        }
        else if (mod.raw) {
            this.raw(name, mod.raw);
        }
    };

    /**
     * Command.all() causes the function to be called on an array of values
     * @author Nate Ferrero
     */
    Command.prototype.all = function cmdAll(name, fn, plugin) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.all(name, fn), fn was not a function, got ' + typeof fn);
        }

        Command.prototype.__defineGetter__(name, function () {
            var self = this;

            /**
             * Handle the case where plugin.args is defined
             */
            if (Array.isArray(plugin.args)) {
                return self.getArgs(name, 'vals', function (vals) {
                    return fn(plugin.args, vals);
                });
            }

            /**
             * Values loader
             */
            var valsLoader = function (args) {
                return self.getArgs(name, 'vals', function (vals) {
                    return fn(args, vals);
                });
            };

            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            var argsLoader = self.getArgs(name, 'args', function (args) {
                return valsLoader(args);
            });

            /**
             * To syntax to avoid merging array arguments, just use raw arguments
             */
            argsLoader.__defineGetter__('to', function () {
                return function rawArgsLoader() {
                    return valsLoader(Array.prototype.slice.call(arguments));
                };
            })

            if (typeof plugin.argSets === 'object' && plugin.argSets) {
                Object.keys(plugin.argSets).forEach(function (key) {
                    argsLoader.__defineGetter__(key, function () {
                        return valsLoader(plugin.argSets[key]);
                    });
                });
            }

            return argsLoader;
        });

        return cmd[name];
    };

    /**
     * Command.each() causes the function to be called on each value
     * @author Nate Ferrero
     */
    Command.prototype.each = function cmdEach(name, fn, plugin) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.each(name, fn), fn was not a function, got ' + typeof fn);
        }

        Command.prototype.__defineGetter__(name, function () {
            var self = this;

            /**
             * Handle the case where plugin.args is defined
             */
            if (Array.isArray(plugin.args)) {
                return self.getArgs(name, 'vals', function (vals) {
                    return vals.map(function (val) {
                        return fn(plugin.args, val);
                    });
                });
            }

            /**
             * Values loader
             */
            var valsLoader = function (args) {
                return self.getArgs(name, 'vals', function (vals) {
                    return vals.map(function (val) {
                        return fn(args, val);
                    });
                });
            };

            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            var argsLoader = self.getArgs(name, 'args', function (args) {
                return valsLoader(args);
            });

            /**
             * To syntax to avoid merging array arguments, just use raw arguments
             */
            argsLoader.__defineGetter__('to', function () {
                return function rawArgsLoader() {
                    return valsLoader(Array.prototype.slice.call(arguments));
                };
            })

            if (typeof plugin.argSets === 'object' && plugin.argSets) {
                Object.keys(plugin.argSets).forEach(function (key) {
                    argsLoader.__defineGetter__(key, function () {
                        return valsLoader(plugin.argSets[key]);
                    });
                });
            }

            return argsLoader;
        });

        return cmd[name];
    };

    /**
     * Command.raw() causes to function to be called exactly once with the given arguments
     */
    Command.prototype.raw = function cmdRaw(name, fn) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.raw(name, fn), fn was not a function, got ' + typeof fn);
        }
        Command.prototype.__defineGetter__(name, function () {
            return fn;
        });
    };

    /**
     * Command.getArgs()
     * @author Nate Ferrero
     */
    Command.prototype.getArgs = function getArgsWrapper(name, purpose, done) {

        var getArgs = function getArgs() {
            var args = Array.prototype.slice.apply(arguments);

            var _args = [];
            args.forEach(function (arg) {
                if (Array.isArray(arg)) {
                    Array.prototype.push.apply(_args, arg);
                }
                else {
                    _args.push(arg);
                }
            });
            return done(_args);
        };

        getArgs.$name = name;
        getArgs.$purpose = purpose;

        if (purpose === 'vals') {
            getArgs.__defineGetter__('and', function () {
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

    var cmd = new Command();

    /**
     * Node.js support
     */
    if (typeof module === 'object') {
        module.exports = cmd;
    }

    /**
     * Require.js support
     */
    else if (typeof scope.define === 'function') {
        scope.define([], cmd);
        scope['cmd:lib'] = {};
    }

    /**
     * Otherwise attach to global
     */
    else {
        scope.cmd = cmd;
        scope['cmd:lib'] = {};
    }
}).call(this);
