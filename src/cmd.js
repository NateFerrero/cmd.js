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
                    'alert',
                    'case', 'clone', 'compare',
                    'equals', 'exists', 'extend',
                    'filter', 'format',
                    'join',
                    'log', 'logger',
                    'match', 'max', 'min',
                    'obj',
                    'pluck', 'product', 'push',
                    'sort', 'sum'
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
            this.registerAllFn(name, mod.all, mod);
        }
        else if (mod.each) {
            this.registerEachFn(name, mod.each, mod);
        }
        else if (mod.raw) {
            this.registerRawFn(name, mod.raw);
        }
    };

    /**
     * Command.registerAllFn() causes the function to be called on an array of values
     * @author Nate Ferrero
     */
    Command.prototype.registerAllFn = function (name, fn, plugin) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.registerAllFn(name, fn), fn was not a function, got ' + typeof fn);
        }

        Command.prototype.__defineGetter__(name, function () {
            var self = this;

            /**
             * Values loader
             */
            var valsLoader = function (args) {
                var getVals = self.args(name, 'vals', function (vals) {
                    return fn(args, vals);
                });

                /**
                 * To syntax to avoid merging array values, just use raw values
                 */
                getVals.__defineGetter__('to', function () {
                    return function rawValsLoader() {
                        return fn.call(null, args, Array.prototype.slice.call(arguments));
                    };
                });

                /**
                 * Map to operate on multiple value sets
                 */
                getVals.__defineGetter__('map', function () {
                    return function mappedValsLoader() {
                        return Array.prototype.map.call(arguments, function (x) {
                            return getVals.apply(null, x);
                        });
                    }
                });

                return getVals;
            };

            /**
             * Handle the case where plugin.args is defined
             */
            if (typeof plugin.args !== 'undefined') {
                return valsLoader(plugin.args);
            }

            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            var argsLoader = self.args(name, 'args', function (args) {
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
     * Command.registerEachFn() causes the function to be called on each value
     * @author Nate Ferrero
     */
    Command.prototype.registerEachFn = function (name, fn, plugin) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.registerEachFn(name, fn), fn was not a function, got ' + typeof fn);
        }

        Command.prototype.__defineGetter__(name, function () {
            var self = this;

            /**
             * Values loader
             */
            var valsLoader = function (args) {
                var getVals = self.args(name, 'vals', function (vals) {
                    return vals.map(function (val) {
                        return fn(args, val);
                    });
                });

                /**
                 * To syntax to avoid merging array values, just use raw values
                 */
                getVals.__defineGetter__('to', function () {
                    return function rawValsLoader() {
                        return Array.prototype.map.call(arguments, fn.bind(null, args));
                    };
                });

                /**
                 * Map to operate on multiple value sets
                 */
                getVals.__defineGetter__('map', function () {
                    return function mappedValsLoader() {
                        return Array.prototype.map.call(arguments, function (x) {
                            return getVals.apply(null, x);
                        });
                    }
                });

                return getVals;
            };

            /**
             * Handle the case where plugin.args is defined
             */
            if (typeof plugin.args !== 'undefined') {
                return valsLoader(plugin.args);
            }

            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            var argsLoader = self.args(name, 'args', function (args) {
                return valsLoader(args);
            });

            /**
             * To syntax to avoid merging array arguments, just use raw arguments
             */
            argsLoader.__defineGetter__('to', function () {
                return function rawArgsLoader() {
                    return valsLoader(Array.prototype.slice.call(arguments));
                };
            });

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
     * Command.registerRawFn() causes to function to be called exactly once with the given arguments
     */
    Command.prototype.registerRawFn = function (name, fn) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.registerRawFn(name, fn), fn was not a function, got ' + typeof fn);
        }
        Command.prototype.__defineGetter__(name, function () {
            return fn;
        });
    };

    /**
     * Command.args()
     * @author Nate Ferrero
     */
    Command.prototype.args = function argsWrapper(name, purpose, done) {

        var args = function args() {
            var _args = [];
            Array.prototype.forEach.call(arguments, function (arg) {
                if (Array.isArray(arg)) {
                    Array.prototype.push.apply(_args, arg);
                }
                else {
                    _args.push(arg);
                }
            });
            return done(_args);
        };

        args.$name = name;
        args.$purpose = purpose;

        if (purpose === 'vals') {
            args.__defineGetter__('and', function () {
                return new Command(args);
            });

            /**
             * Get the first result unwrapped
             */
            args.raw = function () {
                var _args = Array.prototype.slice.apply(arguments);
                var result = args.apply(null, _args);
                return result.shift();
            };

            if (this.context) {
                var context = this.context;
                return cmd.args(name, 'vals', function (vals) {
                    return args.apply(null, context(vals));
                });
            }
        }

        return args;
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
