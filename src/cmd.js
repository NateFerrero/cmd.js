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
                var plugins = [
                    'alert', 'compare', 'copy', 'exists', 'extend', 'filter', 'format', 'join',
                    'log', 'logger', 'lower', 'max', 'min', 'obj', 'pluck', 'product',
                    'push', 'sort', 'sum', 'switch', 'title', 'upper', 'view'
                ];
                return plugins.forEach(function (name) {
                    self.use(name);
                });
            }

            /**
             * Load via require for Node or from window for browser
             */
            var plugin = typeof module === 'object' ? require('./lib/' + name) : scope['cmd:lib'][name];

            if (!plugin || typeof plugin !== 'object') {
                throw new Error('cmd.js plugin ' + name + ' is not available');
            }

            if (plugin.export) {
                plugin.export(self);
            }

            if (plugin.all) {
                self.all(name, plugin.all, plugin);
            }
            else if (plugin.each) {
                self.each(name, plugin.each, plugin);
            }
            else if (plugin.raw) {
                self.raw(name, plugin.raw);
            }
        });
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
