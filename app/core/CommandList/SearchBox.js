'use strict'

var style = `
:host {
	
}
::content {
	input { box-shadow: none !important; border-radius: 0 !important; }
}
`

module.exports = class SearchBox extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.input = this.newElement('input')
		this.input.placeholder = 'Search commands'
		
		defineKeyShortcut('⌘F', 'Search commands', 'Commands')
		self.on("keydown", e => (e.metaKey || e.ctrlKey) && e.keyCode == 70 && this.input.focus())
	}
	
	readyCallback() {
		AppEvent('newPanel', { instance: this, position: 'top' })
	}
}
