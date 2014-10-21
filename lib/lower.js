/**
 * Command: lower('A') === ['a']
 * @author Nate Ferrero
 */
cmd.each('lower', function (args, val) {
    return ('' + val).toLowerCase();
}, []);
