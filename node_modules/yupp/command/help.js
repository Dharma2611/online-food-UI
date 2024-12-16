#!/usr/bin/env node

var MODULE_REQUIRE
	, fs = require('fs')
	, path = require('path')

	, logger = require('../util/logger')
	;

var text = fs.readFileSync(path.join(__dirname, '..', 'help.txt')).toString();
console.log(logger.markup(text));
