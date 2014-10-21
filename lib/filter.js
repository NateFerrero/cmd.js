/**
 * Command: filter(function (x) {
 *          return x >= 3;
 *      })(1, 2, 3) === [3]
 * @author Nate Ferrero
 */
cmd.all('filter', function (args, vals) {
    return vals.filter(function (val) {
        var len = args.length, i = -1;
        while (++i < len) {
            if (!(args[i].raw || args[i])(val)) {
                return false;
            }
        }
        return true;
    });
});
