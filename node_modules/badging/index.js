var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')
	/* NPM */

	/* in-package */
	;

fs.readdirSync(path.join(__dirname, 'lib')).forEach(function(filename) {
	var name = filename.substring(0, filename.length - 3);
	module.exports[name] = require(path.join(__dirname, 'lib', name));
});
