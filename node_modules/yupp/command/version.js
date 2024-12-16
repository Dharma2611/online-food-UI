#!/usr/bin/env node

var pkgJson = require('../package');
console.log(pkgJson.name + ' v' + pkgJson.version);
