/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Compilation")} Compilation */

class Stats {
	/**
	 * @param {Compilation} compilation webpack compilation
	 */
	constructor(compilation) {
		this.compilation = compilation;
		this.hash = compilation.hash;
		this.startTime = undefined;
		this.endTime = undefined;
	}

	/**
	 * @returns {boolean} true if the compilation encountered an error
	 */
	hasWarnings() {
		return (
			this.compilation.warnings.length > 0 ||
			this.compilation.children.some(child => child.getStats().hasWarnings())
		);
	}

	/**
	 * @returns {boolean} true if the compilation had a warning
	 */
	hasErrors() {
		return (
			this.compilation.errors.length > 0 ||
			this.compilation.children.some(child => child.getStats().hasErrors())
		);
	}

	toJson(options) {
		options = this.compilation.createStatsOptions(options, {
			forToString: false
		});

		const statsFactory = this.compilation.createStatsFactory(options);

		return statsFactory.create("compilation", this.compilation, {
			compilation: this.compilation,
			startTime: this.startTime,
			endTime: this.endTime
		});
	}

	toString(options) {
		options = this.compilation.createStatsOptions(options, {
			forToString: true
		});

		const statsFactory = this.compilation.createStatsFactory(options);
		const statsPrinter = this.compilation.createStatsPrinter(options);

		const data = statsFactory.create("compilation", this.compilation, {
			compilation: this.compilation,
			startTime: this.startTime,
			endTime: this.endTime
		});
		const result = statsPrinter.print("compilation", data);
		return result === undefined ? "" : result;
	}
}

module.exports = Stats;
