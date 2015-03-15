(function () {
    'use strict';

    this.export = function (cmd) {

        var arraysEqual = function (a, b) {
            if (a.length !== b.length) {
                return false;
            }
            for (var i in a) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        };

        /**
         * Command: group(2)(1, 2, 3, 4) === [[1, 2], [3, 4]]
         * @author Nate Ferrero
         */
        this.all = function (args, vals) {
            var groups = [];
            var groupBy = [];

            vals.forEach(function (val, i) {
                var by = args.map(function (arg) {
                    if (arg && arg.constructor === cmd.constructor) {
                        return arg.raw(val);
                    }
                    switch (typeof arg) {
                    case 'number':
                        return Math.floor(i / arg);
                    case 'function':
                        return (arg.raw || arg)(val);
                    default:
                        return by;
                    }
                });

                /**
                 * Get the first matching group
                 */
                var groupIndex = (function () {
                    for (var i in groupBy) {
                        /**
                         * We've got a match
                         */
                        if (arraysEqual(groupBy[i], by)) {
                            return i;
                        }
                    }
                })();

                if (groupIndex === undefined) {
                    groupBy.push(by);
                    groupIndex = groupBy.length - 1;
                }

                if (!Array.isArray(groups[groupIndex])) {
                    groups[groupIndex] = [];
                }

                groups[groupIndex].push(val);
            });

            return groups;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].group = {} : this);
