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
                    'alert', 'compare', 'exists', 'extend', 'filter',
                    'format', 'join', 'log', 'logger', 'lower', 'obj', 'pluck',
                    'push', 'sort', 'switch', 'upper', 'view'
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

            if (plugin.all) {
                self.all(name, plugin.all, plugin.args);
            }
            else if (plugin.each) {
                self.each(name, plugin.each, plugin.args);
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
    Command.prototype.all = function cmdAll(name, fn, args) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.all(name, fn), fn was not a function, got ' + typeof fn);
        }

        Command.prototype.__defineGetter__(name, function () {

            if (Array.isArray(args)) {
                return this.getArgs(name, 'vals', function (vals) {
                    return fn(args, vals);
                }.bind(this));
            }

            return this.getArgs(name, 'args', function (args) {
                return this.getArgs(name, 'vals', function (vals) {
                    return fn(args, vals);
                }.bind(this));
            }.bind(this));
        });

        return cmd[name];
    };

    /**
     * Command.each() causes the function to be called on each value
     * @author Nate Ferrero
     */
    Command.prototype.each = function cmdEach(name, fn, args) {
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
            }

            return this.getArgs(name, 'args', function (args) {
                return this.getArgs(name, 'vals', function (vals) {
                    return vals.map(function (val) {
                        return fn(args, val);
                    });
                }.bind(this));
            }.bind(this));
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
