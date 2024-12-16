#!/usr/bin/env node

var MODULE_REQUIRE
/* built-in */
	, fs = require('fs')
	, os = require('os')
	, path = require('path')
	/* NPM */
	, ajv = new require('ajv')()
	, badging = require('badging')
	/* in-package */
	, util2 = require('../util')
	;

var CONFIG = require('./config');

var readmePathname = util2.getPath('README.md');
var readmeLines;
if (!fs.existsSync(readmePathname)) {
	util2.log.warn('README.md not found.');
}
else {
	readmeLines = fs.readFileSync(readmePathname, 'utf8').split('\n');
}

if (CONFIG.badges) {
	var pkgJsonPathname = util2.getPath('package.json');
	if (!fs.existsSync(pkgJsonPathname)) {
		util2.log.error('package.json not found.');
		util2.exit(61);
	}
	else {
		var pkgJson = require(pkgJsonPathname);
		var badgeMarkdowns = {};
		for (var i = 0; i < CONFIG.badges.length; i++) {
			var badge = CONFIG.badges[i];
			var parts = badge.split('.');
			var group = parts[0];
			var ns = badging[group];
			var names = (parts[1] == '*') ? Object.keys(badging[group]) : [ parts[1] ];

			if (group == 'npm') {
				var packageName = CONFIG.name ? CONFIG.name : pkgJson.name;
				names.forEach(function(name) {
					badgeMarkdowns[ group + '.' + name ] = ns[name](packageName).toMarkdown();
				});
			}

			if (group == 'github') {
				var userName;
				var repoName;
				var branch = 'master';

				var repo = pkgJson.repository;
				var re = /github.com\/([^\/]+)\/(.+).git$/;
				if (typeof repo == 'object' && re.test(repo.url)) {
					userName = RegExp.$1;
					repoName = RegExp.$2;
				}

				names.forEach(function(name) {
					badgeMarkdowns[ group + '.' + name ] = ns[name](userName, repoName, branch).toMarkdown();
				});
			}
		}

		if (!readmeLines) {
			readmeLines = [ '# ' + pkgJson.name, '' ];
		}

		var absentBadgeLines = [];
		for (var name in badgeMarkdowns) {
			var md = badgeMarkdowns[name];
			if (readmeLines.indexOf(md) < 0) {
				absentBadgeLines.push(md);
				util2.log.info('Badge _' + name + '_ appended.');
			}
		}
		if (absentBadgeLines.length) {
			// Find line number of the first empty line in README.md
			var n = readmeLines.indexOf('');
			readmeLines = readmeLines.slice(0, n).concat('', absentBadgeLines).concat(readmeLines.slice(n));
		}
	}

	if (!util2.getOption('dryrun')) {
		fs.writeFileSync(readmePathname, readmeLines.join('\n'));
	}
	else {
		util2.log.info('#Action: # Changes on _README.md_ saved.');
	}
}

util2.log.info('_README.md_ reviewed.');
