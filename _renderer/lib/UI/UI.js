'use strict'

module.exports = class UI extends WebComponentAbstract {
	initCallback() {
		// messaging system
		this.newElement(require('./Msg'), false)
		
		// files dragging
		this.newElement(require('./Files'), false)
		
		// prevent browser zoom in non developer mode
		this.developer = false
		self.on('developerMode', e => this.developer = true)
		self.on("wheel", e => e.ctrlKey && !this.developer && e.preventDefault())
	}
}
