var cmd = function () {

};

/**
 * cmd library
 */
cmd.lib = {};

/**
 * cmd: exists(null) === false
 * @author Nate Ferrero
 */
cmd.lib.exists = function $imm () {
    this.val = this.val !== null && this.val !== undefined;
};

/**
 * cmd: pluck('color')({color: 'red'}) === 'red'
 * @author Nate Ferrero
 */
cmd.lib.pluck = function () {
    this.args.forEach(function (arg) {
        if (cmd.exists(this.val)) {
            this.val = this.val[arg];
        }
    });
};

