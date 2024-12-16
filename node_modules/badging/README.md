#	badging
__Index of frequently used badges for NPM__

[![total downloads of badging](https://img.shields.io/npm/dt/badging.svg)](https://www.npmjs.com/package/badging)
[![badging's License](https://img.shields.io/npm/l/badging.svg)](https://www.npmjs.com/package/badging)
[![latest version of badging](https://img.shields.io/npm/v/badging.svg)](https://www.npmjs.com/package/badging)
[![coverage status of github.com/YounGoat/nodejs.badging](https://coveralls.io/repos/github/YounGoat/nodejs.badging/badge.svg?branch=master)](https://coveralls.io/github/YounGoat/nodejs.badging2?branch=master)
[![build status of github.com/YounGoat/nodejs.badging](https://travis-ci.org/YounGoat/nodejs.badging.svg?branch=master)](https://travis-ci.org/YounGoat/nodejs.badging)
[![star github.com/YounGoat/nodejs.badging](https://img.shields.io/github/stars/YounGoat/nodejs.badging.svg?style=social&label=Star)](https://github.com/YounGoat/nodejs.badging/stargazers)

##	Get Started

Install the package as one of dependencies of your package:

```bash
npm install --save badging
```

Then, require it and get medal info you need. E.g.

```javascript
const badging = require('badging');

// The arguments may differ (in number and content) from medal type to type.
var badge = badging.npm.version('npm-package-name');

// Generate html.
var html = badge.toHtml();

// Generate markdown.
var markdown = badge.toMarkdown();

// The returned info object always contains two properties: href & src.
// Generate text at will.
var text = `<a href="${badge.href}"><img src="${badge.src}"/></a>`;
```

##	Embodied Badges

###	npm.downloads

```javascript
var badge = badging.npm.downloads(packageName, unit);
```

The `unit` may be one of:  
*	year
*	month
*	week
*	total

###	npm.license

```javascript
var badge = badging.npm.license(packageName);
```

###	npm.version

```javascript
var badge = badging.npm.version(packageName);
```

###	github.coveralls

```javascript
var badge = badging.github.coveralls(userName, repoName);
```

###	github.star

```javascript
var badge = badging.github.star(userName, repoName);
```

###	github.travis

```javascript
var badge1 = badging.github.travis(userName, repoName);
var badge2 = badging.github.travis(userName, repoName, branch);
```
