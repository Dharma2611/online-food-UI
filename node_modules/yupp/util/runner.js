var MODULE_REQUIRE
	, child_process = require('child_process')
	, os = require('os')
	;

var OPTIONS = require('../util/options');
var logger = require('../util/logger');

module.exports = function(cmd, cwd, forceRun) {
	if (!forceRun && OPTIONS.dryrun) {
		logger.info('#$ #`' + cmd + '`');
		if (cwd) {
			logger.info('#$ ' + cwd + '#');
		}
		return { lines: [], error: null };
	}

	var response = { error: null };
	try {
		var stdout = child_process.execSync(cmd, { cwd: cwd, stdio: [ null, null, null ] });
		response.lines = stdout.toString().split(os.EOL);
	} catch (e) {
		response.error = e;
	}
	return response;
};
