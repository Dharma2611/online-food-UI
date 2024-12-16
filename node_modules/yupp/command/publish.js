#!/usr/bin/env node

var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* NPM */

	/* in-package */
	, logger = require('../util/logger')
	, runner = require('../util/runner')
	, OPTIONS = require('../util/options')
	;

require('./config');

var pathname, pkgJson, rawName;

var changeName = function(name) {
	if (pkgJson.name != name) {
		pkgJson.name = name;
		if (!OPTIONS.dryrun) {
			fs.writeFileSync(pathname, JSON.stringify(pkgJson, null, 4), 'utf8');
		}
		else {
			logger.info('#Action: # Changes on package.json saved.');
		}
		logger.info('Package name changed/reset to *' + name + '*.');
	}
};

var runPublish = function(name) {
	changeName(name);
	var response = runner('npm publish');
	if (response.error) {
		logger.error('Failed to publish to NPM registry.');
		process.exit(1);
	}
	logger.info('Published to NPM as *' + name + '*.');
};

// ---------------------------
// 检查 package.json 是否存在。

pathname = path.join(OPTIONS.path, 'package.json');
if (!fs.existsSync(pathname)) {
	logger.error('_package.json_ NOT FOUND in _' + OPTIONS.path + '_');
	process.exit(41);
}
pkgJson = require(pathname);
rawName = pkgJson.name;

// ---------------------------
// 变更名称并发布。

runPublish(OPTIONS.config.name ? OPTIONS.config.name : rawName);

if (OPTIONS.config.alias) {
	var alias = OPTIONS.config.alias;
	if (typeof alias == 'string') {
		alias = [ alias ];
	}
	alias.forEach(function(alias) {
		runPublish(alias)
	});
}

// ---------------------------
// 恢复名称。

changeName(rawName);
