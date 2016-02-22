'use strict'

module.exports = class AppEvent extends Event {
	constructor(name, detail) {
		super(name)
		
		this.detail = detail
		this.d = this.detail // shorthand
		
		self.dispatchEvent(this)
	}
}
