/**
 * Command: switch(function (when, val) {
 *   when(val == 1, function () { return 'a'; });
 *   when(val == 2, function () { return 'b'; });
 *   when(val >= 3, function () { return 'c'; });
 * })(1, 2, 3) === ['a', 'b', 'c']
 * @author Nate Ferrero
 */
cmd.each('switch', function (args, val) {
    cond = args[0];
    if (typeof cond !== 'function') {
        throw new Error('cmd.switch(function (when) { ... }) called without function as first argument');
    }

    var when = function (condition, result) {
        if (typeof result !== 'function') {
            throw new Error('when(condition, function () { ... }) called without function as second argument');
        }
        if (condition) {
            throw {
                name: 'ConditionMatched',
                result: result()
            };
        }
    };

    try {
        cond(when, val);
    }
    catch (e) {
        if (e.name === 'ConditionMatched') {
            return e.result;
        }
        else {
            throw e;
        }
    }
});
