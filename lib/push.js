/**
 * Command: push(1)(2) === [2, 1]
 * @author Nate Ferrero
 */
cmd.all('push', function (args, vals) {
    return args.map(function (arg) {
        arg.push.apply(arg, vals);
    });
});
