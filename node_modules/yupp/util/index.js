var MODULE_REQUIRE
	/* built-in */
	, path = require('path')
	/* NPM */

	/* in-package */
	;

var OPTIONS = require('./options');

module.exports = {
	exit: function(code) {
		if (!OPTIONS.dryrun) process.exit(code);
	},

	getOption: function(name) {
		return OPTIONS[name];
	},

	getPath: function(subpath) {
		return path.join(OPTIONS.path, subpath);
	},

	log: require('./logger'),
	run: require('./runner')
}
