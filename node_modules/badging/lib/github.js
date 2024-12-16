'use strict';

const MODULE_REQUIRE = 1
	/* built-in */

	/* NPM */

	/* in-package */
	, Badge = require('badging/badge')
	;

let getName = (userName, repoName) => {
	return `github.com/${userName}/${repoName}`;
};

module.exports = {
	coveralls(userName, repoName, branch) {
		if (!branch) branch = 'master';
		return new Badge({
			title: `coverage status of ${getName(userName, repoName)}`,
			src: `https://coveralls.io/repos/github/${userName}/${repoName}/badge.svg?branch=${branch}`,
			href: `https://coveralls.io/github/${userName}/${repoName}2?branch=${branch}`
		});
	},

	travis(userName, repoName, branch) {
		if (!branch) branch = 'master';
		return new Badge({
			title: `build status of ${getName(userName, repoName)}`,
			src: `https://travis-ci.org/${userName}/${repoName}.svg?branch=${branch}`,
			href: `https://travis-ci.org/${userName}/${repoName}`
		});
	},

	star(userName, repoName) {
		return new Badge({
			title: `star ${getName(userName, repoName)}`,
			src: `https://img.shields.io/github/stars/${userName}/${repoName}.svg?style=social&label=Star`,
			href: `https://github.com/${userName}/${repoName}/stargazers`
		});
	}
};
