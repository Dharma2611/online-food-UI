#!/usr/bin/env node

var MODULE_REQUIRE
	, fs = require('fs')
	, os = require('os')
	, path = require('path')
	/* in-package */
	, ignore = require('../util/ignore')
	, logger = require('../util/logger')
	, runner = require('../util/runner')
	, OPTIONS = require('../util/options')
	;

require('./config');

// ---------------------------
// 检查系统命令。
var cmd, response;

response = runner('git --version');
if (response.error) {
	logger.error('System command *git* NOT FOUND.');
	process.exit(1);
}
logger.info('Git client found.');

response = runner('git status', OPTIONS.path, true);
if (response.error) {
	logger.warn('Not a git repository: _' + OPTIONS.path + '_');
	runner('git init', OPTIONS.path);
	logger.info('Git repository initiated.');
}
else {
	logger.info('Git repository found.');
}

ignore('.gitignore', 'package-lock.json');
ignore('.gitignore', 'node_modules');

runner('git add . && git commit -m "Auto committed by YUPP"', OPTIONS.path);
logger.info('Committed to local repository.');

var pathname = path.join(OPTIONS.path, 'package.json');
if (!fs.existsSync(pathname)) {
	logger.warn('_package.json_ NOT FOUND in _' + OPTIONS.path + '_');
	process.exit(41);
}
var pkgJson = require(pathname);
runner('git tag ' + pkgJson.version, OPTIONS.path);
logger.info('Repository tag added.');
