/**
 * Command
 * @author Nate Ferrero
 */
(function () {
    'use strict';

    var scope = this;

    /**
     * Helper to merge array arguments
     */
    var merge = function (args) {
        var _args = [];
        Array.prototype.forEach.call(args, function (arg) {
            if (Array.isArray(arg)) {
                Array.prototype.push.apply(_args, arg);
            }
            else {
                _args.push(arg);
            }
        });
        return _args;
    };

    /**
     * Command class
     */
    var Command = function (_fn, name) {
        this.fn = _fn ? _fn.bind(this) : null;
        this.name = name;
    };

    /**
     * Command.use() loads plugins
     */
    Command.prototype.use = function () {
        var self = this;
        Array.prototype.forEach.call(arguments, function (name) {
            if (name === '*') {
                var libs = [
                    'add', 'alert',
                    'call', 'case', 'clone', 'compare', 'count',
                    'default', 'divide', 'do',
                    'equals', 'exists', 'extend',
                    'filter', 'first', 'format',
                    'get', 'group', 'gt', 'gte',
                    'has', 'head',
                    'join',
                    'last', 'log', 'logger', 'lt', 'lte',
                    'match', 'max', 'min', 'multiply',
                    'not',
                    'obj',
                    'product', 'push',
                    'reject', 'reverse',
                    'slice', 'sort', 'subtract', 'sum',
                    'tail', 'tap'
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
                return self.vals(name, function (vals) {
                    if (!Array.isArray(vals)) {
                        vals = [vals];
                    }
                    if (self._map) {
                        return vals.map(function (val) {
                            if (!Array.isArray(val)) {
                                val = [val];
                            }
                            return fn(args, val);
                        });
                    }
                    return fn(args, vals);
                });
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
            var argsLoader = self.args(name, function (args) {
                return valsLoader(args);
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
                return self.vals(name, function (vals) {
                    var eachFn = function (val) {
                        if (self._map) {
                            if (!Array.isArray(val)) {
                                val = [val];
                            }
                            return val.map(function (v) {
                                if (!Array.isArray(v)) {
                                    v = [v];
                                }
                                return fn(args, v);
                            });
                        }
                        return fn(args, val);
                    };
                    if (!Array.isArray(vals)) {
                        return eachFn(vals);
                    }
                    return vals.map(eachFn);
                });
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
            var argsLoader = self.args(name, function (args) {
                return valsLoader(args);
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
        return cmd[name];
    };

    /**
     * Command.with
     */
    Command.prototype.with = function () {
        if (!this.fn) {
            throw new Error('Inappropriate place to call .with()')
        }

        /**
         * Merge multiple subsets of arguments
         */
        if (this._map) {
            var self = this;
            return Array.prototype.map.call(arguments, function (args) {
                if (!Array.isArray(args)) {
                    args = [args];
                }
                return self.args('with', self.fn).apply(self, args);
            });
        }

        return this.args('with', this.fn).apply(null, Array.prototype.slice.call(arguments));
    };

    /**
     * Command.to
     */
    Command.prototype.to = function () {
        if (!this.fn) {
            throw new Error('Inappropriate place to call .to()')
        }
        return this.fn(Array.prototype.slice.call(arguments));
    };

    /**
     * Command.raw
     */
    Command.prototype.__defineGetter__('raw', function () {
        var self = this;
        return function (value) {
            if (!self.fn) {
                throw new Error('Inappropriate place to call .raw()')
            }
            return self.fn(Array.isArray(value) ? value : [value])[0];
        };
    });

    /**
     * Command.map
     */
    Command.prototype.__defineGetter__('map', function () {
        this._map = true;
        return this;
    });

    /**
     * Command.args()
     * @author Nate Ferrero
     */
    Command.prototype.args = function argsWrapper(name, done) {
        var args = function args() {
            return done(merge(arguments));
        };
        args.$name = name;

        /**
         * Skip argument merging with .to()
         */
        args.__defineGetter__('to', function () {
            return function unmergedArgs() {
                return done(Array.prototype.slice.call(arguments));
            };
        });

        return args;
    };

    /**
     * Command.vals()
     * @author Nate Ferrero
     */
    Command.prototype.vals = function valsWrapper(name, done) {
        var last = this.fn;

        return new Command(function (args) {
            if (last) {
                args = last(args);
            }
            return done(args);
        }, name);
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
