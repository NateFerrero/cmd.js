/**
 * Command: upper('a') === ['A']
 * @author Nate Ferrero
 */
cmd.each('upper', function (args, val) {
    'use strict';
    return ('' + val).toUpperCase();
}, []);
