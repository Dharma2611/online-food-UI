#!/usr/bin/env node

var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* npm */
	, semver = require('semver')

	/* in-package */
	, logger = require('../util/logger')
	, OPTIONS = require('../util/options')
	;

require('./config');
require('./readme');

if (!OPTIONS.upgrade) {
	OPTIONS.upgrade = 'patch';
}

// ---------------------------
// 检查系统命令。
var cmd, response;

// ---------------------------
// 检查 package.json 是否存在。

var pathname = path.join(OPTIONS.path, 'package.json');
if (!fs.existsSync(pathname)) {
	logger.error('_package.json_ NOT FOUND in _' + OPTIONS.path + '_');
	process.exit(41);
}

// ---------------------------
// 修改 package.json。

var pkgJson = require(pathname);

if (OPTIONS.version) {
	pkgJson.version = OPTIONS.version;
}
else {
	pkgJson.version = semver.inc(pkgJson.version, OPTIONS.upgrade, OPTIONS.prereleaseName);
}

if (!OPTIONS.dryrun) {
	fs.writeFileSync(pathname, JSON.stringify(pkgJson, null, 4), 'utf8');
}
else {
	logger.info('#Action: # Changes on _package.json_ saved.');
}
logger.info('Package upgraded to *' + pkgJson.version + '*.');
