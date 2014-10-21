/**
 * Command: alert('a') - shows an alert
 * @author Nate Ferrero
 */
cmd.each('alert', function (args, val) {
    return alert(val);
}, []);
