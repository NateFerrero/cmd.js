/**
 * Command: format('a: {}')('A') === ['a: A']
 * @author Nate Ferrero
 */
cmd.each('format', function (args, val) {
    return args.map(function (arg) {
        return arg.replace('{}', val);
    });
});
