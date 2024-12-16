function Badge(options) {
	this.title = options.title;
	this.src   = options.src;
	this.href  = options.href;
}

Badge.prototype.toHtml = function() {
	return `<a href="${this.href}" title="${this.title}"><img src="${this.src}" alt="${this.title}"/></a>`;
};

Badge.prototype.toMarkdown = function() {
	return `[![${this.title}](${this.src})](${this.href})`;
};

module.exports = Badge;
