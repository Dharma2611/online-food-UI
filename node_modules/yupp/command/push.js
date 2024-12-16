#!/usr/bin/env node

var MODULE_REQUIRE
	/* in-package */
	, logger = require('../util/logger')
	, runner = require('../util/runner')
	, OPTIONS = require('../util/options')
	;

require('./config');
require('./commit');

// ---------------------------
// 检查系统命令。
var cmd, response;

response = runner('git remote', OPTIONS.path, true);
var lines = [];
if (response.lines) {
	lines = response.lines.filter(function(line) { return line != ''; });
}
if (lines.length == 0) {
	logger.error('No remote repository found.');
	if (!OPTIONS.dryrun) process.exit(1);
}

var remote;
if (OPTIONS.pushRemote) {
	if (lines.indexOf(OPTIONS.pushRemote) < 0) {
		logger.error('Remote *' + remote + '* NOT FOUND.');
		process.exit(1);
	}
	remote = OPTIONS.pushRemote;
}
else if (lines.length == 1) {
	remote = lines[0];
}
else if (lines.indexOf('origin') >= 0) {
	remote = 'origin';
}
else if (lines.length > 1) {
	logger.warn('More than one remote repository found and none named _origin_, please specified one.');
	process.exit(1);
}

response = runner('git push origin HEAD --tags', OPTIONS.path);
if (response.error) {
	logger.error('Failed to push to remote repository.');
	if (!OPTIONS.dryrun) process.exit(1);
}
logger.info('Pushed to remote repository.');
