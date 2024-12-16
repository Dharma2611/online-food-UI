#   Change Log

Notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning 2.0.0](http://semver.org/).

##	[0.3.0] - Dec 9th, 2018

*	Fixed the bug that dependence of `ajv` is not declared in [package.json](./package.json).

##	[0.2.7] - Feb 15th, 2018

*	"CHANGELOG.md" is inserted into `.npmignore`.
*	"README.*.md" is inserted into `.npmignore`.
 
##	[0.2.6] - Feb 15th, 2018

*	"package-lock.json" is inserted into `.gitignore`.

##	[0.2.0] - 2017-05

### Added

In this version, assistant command *yupp* is changed to replace the main command *yuan-npm-release*, and the latter is removed.

A new assistant command *yu* is added which used to do _upgrade_ only. Meanwhile, _upgrade_ means more than changing version. E.g., badges will be inserted into _README.md_ if they are demanded in _yupp.json_.

###	Deprecated

The old main command *yuan-npm-release* will not be installed in this version.

##	[0.1.0] - 2016-12

Since this version, this package will be simultaneously published by name *yupp*.

###	Added

*	__Dryrun mode supported__  
	With ```--dryrun``` or ```-d``` option added, the command will run in dry-run (testing) mode.  
	What is *dry run* ? See [https://en.wikipedia.org/wiki/Dry_run_(testing)](https://en.wikipedia.org/wiki/Dry_run_(testing)) for more details.

*	__New command *ypp*__  
	Run push (to remote) and publish (to registry), without change version in package.json.

##	[0.0.4] - 2016-11

###	Fixed

Fixed the bug that what ignored is still added and commited to the repository.


---
This CHANGELOG.md follows [*Keep a CHANGELOG*](http://keepachangelog.com/).
