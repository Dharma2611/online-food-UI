var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* NPM */
	, minimist = require('minimist')
	, semver = require('semver')

	/* in-package */
	, logger = require('./logger')
	;

var argv = process.argv.slice(2);
var command = !argv[0] || argv[0].startsWith('-') ? null : argv.shift();
var rawOptions = minimist(argv);
var unreadOptions = Object.assign({}, rawOptions);
var read = function(name) {
	var value = rawOptions[name];
	delete unreadOptions[name];
	return value;
};
var checkDrain = function() {
	var params = [];
	for (var name in unreadOptions) {
		if (name == '_') continue;
		var param = (name.length > 1 ? '--' : '-') + name;
		if (unreadOptions[name] !== true) {
			param += ' ' + unreadOptions[name];
	 	}
		params.push(param);
	}
	params = params.concat(unreadOptions._);
	if (params.length) {
		logger.error('Unknown/duplicated/redundant command parameters: ' + params.join(' '));
		process.exit(40);
	}
};

var OPTIONS = {
	command: command,
	dryrun: read('d') || read('dryrun') || read('dry-run'),
};

if (!OPTIONS.command) {
	if (read('h') || read('help')) {
		OPTIONS.command = 'help';
	}
	else if (read('v') || read('version')) {
		OPTIONS.command = 'version';
	}
}

if (!OPTIONS.command) {
	OPTIONS.path = read('path')
		? path.resolve(read('path'))
		: process.cwd();

	if (!fs.existsSync(OPTIONS.path)) {
		logger.error('Package does not exists at: _' + OPTIONS.path + '_');
		process.exit(40);
	}

	OPTIONS.upgrade = read('u') || read('upgrade');
	OPTIONS.push    = read('p') || read('push');
	OPTIONS.commit  = read('c') || read('commit');
	OPTIONS.publish = read('P') || read('publish');

	if (OPTIONS.upgrade === true) {
		OPTIONS.upgrade = 'patch';
	}
	else if (typeof OPTIONS.upgrade == 'number') {
		OPTIONS.version = OPTIONS.upgrade + '.0';
		OPTIONS.upgrade = true;
	}
	else if (OPTIONS.upgrade) {
		if (semver.valid(OPTIONS.upgrade)) {
			OPTIONS.version = OPTIONS.upgrade;
			OPTIONS.upgrade = true;
		}
		else {
			var name = OPTIONS.upgrade.toLowerCase();
			if ([ 'major', 'minor', 'patch' ].indexOf(name) < 0) {
				OPTIONS.prereleaseName = OPTIONS.upgrade;
				OPTIONS.upgrade = 'prerelease';
			}
		}
	}

	if (typeof read('push') == 'string') {
		OPTIONS.pushRemote = read('push');
		OPTIONS.push = true;
	}
}

checkDrain();

module.exports = OPTIONS;
