'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, assert = require('assert')
	/* NPM */

	/* in-package */
	, badging = require('badging')
	, Badge = require('badging/badge')
	;

describe('Badge', () => {
	let badge = new Badge({ title: 'demo', src: 'http://example.com/badge.svg', href: 'http://example.com/' });
	it('toHtml', () => {
		assert.ok(badge.toHtml());
	});

	it('toMarkdown', () => {
		assert.ok(badge.toMarkdown());
	});
});

describe('npm badges', () => {
	it('npm.downloads', () => {
		assert.ok(badging.npm.downloads('badging'));
	});

	it('npm.license', () => {
		assert.ok(badging.npm.license('badging'));
	});

	it('npm.version', () => {
		assert.ok(badging.npm.version('badging'));
	});
});

describe('github badges', () => {
	it('github.coveralls', () => {
		assert.ok(badging.github.coveralls('YounGoat', 'nodejs.badging'));
	});

	it('github.star', () => {
		assert.ok(badging.github.star('YounGoat', 'nodejs.badging'));
	});

	it('github.travis.build', () => {
		assert.ok(badging.github.travis.build('YounGoat', 'nodejs.badging'));
	});
});
