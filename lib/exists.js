/**
 * Command: exists(null) === [false]
 *      exists.raw(null) === false
 * @author Nate Ferrero
 */
cmd.each('exists', function (args, val) {
    'use strict';
    return val !== null && val !== undefined;
}, []);
