'use strict';

const MODULE_REQUIRE = 1
	/* built-in */

	/* NPM */

	/* in-package */
	, Badge = require('../badge')
	;

const npmHomepage = (packageName) => {
	return `https://www.npmjs.com/package/${packageName}`;
};

module.exports = {
	downloads(packageName, unit) {
		const D = {
			year  : [ 'dy', 'yearly'  ],
			month : [ 'dm', 'monthly' ],
			week  : [ 'dw', 'weekly'  ],
			total : [ 'dt', 'total'   ]
		};
		if (!unit) unit = 'total';
		const d = D[unit];

		return new Badge({
			title: `${d[1]} downloads of ${packageName}`,
			src: `https://img.shields.io/npm/${d[0]}/${packageName}.svg`,
			href: npmHomepage(packageName)
		})
	},

	license(packageName) {
		return new Badge({
			title: `${packageName}'s License`,
			src: `https://img.shields.io/npm/l/${packageName}.svg`,
			href: npmHomepage(packageName)
		});
	},

	version(packageName) {
		return new Badge({
			title: `latest version of ${packageName}`,
			src: `https://img.shields.io/npm/v/${packageName}.svg`,
			href: npmHomepage(packageName)
		});
	}
}
