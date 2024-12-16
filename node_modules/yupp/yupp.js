#!/usr/bin/env node

'use strict';

var MODULE_REQUIRE
	, OPTIONS = require('./util/options')
	;

var run = false;

if (OPTIONS.command) {
	require('./command/' + OPTIONS.command);
	process.exit(0);
}

[ 'init', 'upgrade', 'push', 'publish' ].forEach(function(step) {
	if (OPTIONS[step]) {
		run = true;
		require('./command/' + step);
	}
});

if (!run) {
	require('./command/upgrade');
	require('./command/push');
	require('./command/publish');
}
