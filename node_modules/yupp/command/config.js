#!/usr/bin/env node

var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, os = require('os')
	, path = require('path')
	/* NPM */
	, ajv = new require('ajv')()
	/* in-package */
	, ignore = require('../util/ignore')
	, logger = require('../util/logger')
	, runner = require('../util/runner')
	, OPTIONS = require('../util/options')
	;

var yuppName;
[ 'yupp.json', '.yupp.json' ].forEach(function(name) {
	if (yuppName) return;
	if (fs.existsSync(path.join(OPTIONS.path, name))) yuppName = name;
});
if (yuppName) {
	var yuppPathname = path.join(OPTIONS.path, yuppName);
	var json = {};
	try {
		json = JSON.parse(fs.readFileSync(yuppPathname));
	} catch(ex) {
		logger.error('_yupp.json_ is not a valid JSON file.');
		process.exit(41);
	}

	var schema = require('../yupp.schema');
	var validate = ajv.compile(schema);
	if (!validate(json)) {
		logger.error('_yupp.json_ does not conform to yupp.schema.');
		logger.info('For details see https://github.com/YounGoat/nodejs.npm-release#about-yuppjson')
		process.exit(41);
	}

	OPTIONS.config = json;
	logger.info('_' + yuppName + '_ has been read');

	ignore('.npmignore', yuppName);
	ignore('.npmignore', 'CHANGELOG.md');
	ignore('.npmignore', 'README.*.md');
}
else {
	OPTIONS.config = {};
}

module.exports = OPTIONS.config;
