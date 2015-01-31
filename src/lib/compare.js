(function () {
    'use strict';

    this.export = function () {

        /**
         * Command: compare(6, 3) === -1
         * @author Nate Ferrero
         */
        this.raw = function (_a, _b) {
            var compare = function (a, b) {
                if (typeof a !== typeof b) {
                    return compare(typeof a, typeof b);
                }
                switch (typeof a) {
                    case 'number':
                        return a - b;
                    case 'string':
                    case 'boolean':
                        if (a === b) {
                            return 0;
                        }
                        return a > b ? 1 : -1;
                    default:
                        return 0;
                }
            };

            if (!Array.isArray(_a)) {
                return compare(_a, _b);
            }

            var result = 0;

            for (var i = 0; i < _a.length; i++) {
                result = compare(_a[i], _b[i]);
                if (result !== 0) {
                    break;
                }
            }

            return result;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].compare = {} : this);
