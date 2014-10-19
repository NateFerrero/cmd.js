var args = function (then) {
    return function (args) {
        var args = Array.prototype.slice.apply(arguments);
        var getValues = function () {
            return then(args, Array.prototype.slice.apply(arguments));
        };
        getValues.split = function(cmd) {
            return function () {
                return cmd(then(args, Array.prototype.slice.apply(arguments)));
            }
        }
        return getValues;
    }
};

args(function (args, values) {
    console.log(1, args, values);
})(2)(3);

args(function (args, values) {
    console.log(4, args, values);
    return 5;
})(6).split(args(function (a, v) {
    console.log(7, a, v);
})(8))(9);
