/**
 * Command: log('a') - logs to console
 * @author Nate Ferrero
 */
cmd.each('log', function (args, val) {
    'use strict';
    return console.log(val);
}, []);
