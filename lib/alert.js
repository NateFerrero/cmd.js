/**
 * Command: alert('a') - shows an alert
 * @author Nate Ferrero
 */
cmd.each('alert', function (args, val) {
    'use strict';
    return alert(val);
}, []);
