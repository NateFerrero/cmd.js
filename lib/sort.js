/**
 * Command: sort(function (val) {
 *   return val;
 * })(3, 2, 1) === [1, 2, 3]
 * @author Nate Ferrero
 */
cmd.all('sort', function (args, vals) {
    return vals.sort(function (a, b) {
        if (!args.length) {
            return cmd.compare(a, b);
        }
        return cmd.compare(
            args.map(function (arg) {
                return arg(a);
            }),
            args.map(function (arg) {
                return arg(b);
            })
        );
    });
});
