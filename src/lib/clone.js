(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Command: clone(null) === [false]
         *      clone.raw(null) === false
         * @author Nate Ferrero
         */
        this.args = [];
        this.each = function (args, val) {
            return clone(val, cmd);
        };

        /**
         * From: http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object/728694#728694
         */
        function clone(obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Never clone commands
            if (obj.constructor === cmd.constructor) {
                return obj;
            }

            // Handle Object
            if (obj instanceof Object) {
                return cloneObject(obj);
            }

            throw new Error('Unable to copy obj! Its type (' + typeof obj + ')is not supported.');
        }

        function cloneObject(obj) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = clone(obj[attr]);
                }
            }
            return copy;
        }
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].clone = {} : this);
