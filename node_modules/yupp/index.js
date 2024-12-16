#!/usr/bin/env node
'use strict';

var MODULE_REQUIRE
	, OPTIONS = require('./util/options')
	;

var run = false;

if (OPTIONS.help) {
	require('./command/help');
	process.exit(0);
}

if (OPTIONS.ver) {
	require('./command/version');
	process.exit(0);
}

[ 'readme', 'upgrade', 'commit', 'push', 'publish' ].forEach(function(step) {
	if (OPTIONS[step]) {
		run = true;
		require('./command/' + step);
	}
});

if (!run) {
	require('./command/help');
}
