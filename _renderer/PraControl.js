'use strict'

class PraControl extends require('web-component-app') {
	initCallback() {
		// package info
		this.package = require('../package.json')
		
		// core modules
		this.core = ['About', 'CommandList', 'Console', 'Dashboard', 'Developer', 'KeyShortcutsTable', 'Module', 'Panel', 'Serial', 'Printer', 'Tab']
		
		// error reporting here, must load first
		this.newElement(require('UI/UI'), false)
		
		// render css then load content
		this.lessOpt = { paths: [require('rembased'), __dirname + '/res'] }
		this.renderLess(__dirname + '/res/style.less', { global: true }).then(e => this.appMain())
	}
}

global.App = document.body.newElement(PraControl)
