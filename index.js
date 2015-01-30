/**
 * cmd.js
 * @author Nate Ferrero
 * Note: this is the Node.js version, do not use this file for browser use
 */
var cmd = require('./src/cmd');
cmd.use('*');
module.exports = cmd;
