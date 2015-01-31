(function () {
    'use strict';

    this.export = function () {


        /**
         * Command: case.lower('aAa') === ['aaa']
         * Command: case.title('aAa') === ['Aaa']
         * Command: case.upper('aAa') === ['AAA']
         * @author Nate Ferrero
         */

        /*
         * To Title Case 2.1 – http://individed.com/code/to-title-case/
         * Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
         */
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        this.argSets = {
            lower: 'lower',
            title: 'title',
            upper: 'upper'
        };

        this.each = function (args, val) {
            /**
             * Title Case
             */
            if (args === 'title') {
                return ('' + val).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
                    if (index > 0 && index + match.length !== title.length &&
                        match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
                        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                        title.charAt(index - 1).search(/[^\s-]/) < 0) {
                        return match.toLowerCase();
                    }

                    if (match.substr(1).search(/[A-Z]|\../) > -1) {
                        return match;
                    }

                    return match.charAt(0).toUpperCase() + match.substr(1);
                });
            }

            /**
             * Upper Case
             */
            else if (args === 'upper') {
                return ('' + val).toUpperCase();
            }

            /**
             * Lower Case
             */
            else if (args === 'lower') {
                return ('' + val).toLowerCase();
            }

            /**
             * Unknown
             */
            else {
                throw new Error('Invalid string case name, should be lower, title, or upper');
            }
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].case = {} : this);

