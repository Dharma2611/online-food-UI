var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* NPM */

	/* in-package */
	, OPTIONS = require('./options')
	, logger = require('./logger')
	;

// Add to .gitignore or .npmignore (depends on the name).
module.exports = function(name, pattern) {
	var pathname = path.join(OPTIONS.path, name);
	var text = '', found = false;
	if (fs.existsSync(pathname)) {
		text = fs.readFileSync(pathname, { encoding: 'utf8' });
		var lines = text.split(/(\r|\n)+/);
		for (var i = 0, line; i < lines.length; i++) {
			line = lines[i].trim();
			if (line == pattern) {
				found = true;
				break;
			}
		}
	}
	if (!found) {
		text += [ '', '# Added by YUPP, ' + new Date, pattern ].join('\n');
		if (!OPTIONS.dryrun) {
			fs.writeFileSync(pathname, text);
			logger.info('Write to *' + name + '*.');
		}
		else {
			logger.info('#Action:# Write to *' + name + '*.');
		}
	}
	logger.info(logger.em(pattern) + ' is now included in ' + logger.em(name) + '.', true);
}
