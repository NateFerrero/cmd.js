/**
 * Command: obj('a', 'b')(1, 2) === [{a: 1, b: 2}]
 */
cmd.all('obj', function (args, vals) {
    var obj = {};
    args.forEach(function (arg, i) {
        if (i in vals) {
            obj[arg] = vals[i];
        }
    });
    return [obj];
});
