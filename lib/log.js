/**
 * Command: log('a') - logs to console
 * @author Nate Ferrero
 */
cmd.each('log', function (args, val) {
    return console.log(val);
}, []);
