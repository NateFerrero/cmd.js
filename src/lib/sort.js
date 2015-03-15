(function () {
    'use strict';

    this.export = function (cmd) {
        /**
         * Dependencies
         */
        cmd.use('compare', 'clone');

        /**
         * Command: sort(function (val) {
         *   return val;
         * })(3, 2, 1) === [1, 2, 3]
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            var direction = 1;
            var local = cmd.clone.with(args);

            if (local && local.length && typeof local[0] === 'number') {
                direction = local.shift();
            }

            if (direction === 0) {
                return vals;
            }

            return vals.sort(function (a, b) {
                if (!local.length) {
                    return direction * cmd.compare(a, b);
                }
                return direction * cmd.compare(
                    local.map(function (arg) {
                        if (arg && arg.constructor === cmd.constructor) {
                            return arg.raw(a);
                        }
                        return (arg.raw || arg)(a);
                    }),
                    local.map(function (arg) {
                        if (arg && arg.constructor === cmd.constructor) {
                            return arg.raw(b);
                        }
                        return (arg.raw || arg)(b);
                    })
                );
            });
        };

        this.argSets = {
            /**
             * Argset for ascending sort
             */
            asc: [],

            /**
             * Argset for descending sort
             */
            desc: [-1]
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].sort = {} : this);
