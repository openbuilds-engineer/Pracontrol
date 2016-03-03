'use strict'

var gCode = require('./gCode').commands

var style = `
:host {
	display: block;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}

::content {
	
}
`

module.exports = class CommandList extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		// not implemented
		// this.searchBox = this.newElement(require('./searchBox'), false)
		
		defineAppEvent('newCommand', 'Add new item to commands table', 'Commands', "{ name: '', desc: '', cat: '', arg: '' }")
		self.on('newCommand', e => this.newCommand(e.d))
		
		this.table = this.newElement('table')
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, title: 'Commands', priority: -70 })
	}
	
	attachedCallback() {
		this.categories = []
		this.commands = []
		
		Object.keys(gCode).forEach(code => {
			var val = gCode[code]
			AppEvent('newCommand', { name: code, desc: val.title, cat: val.cat, arg: val.arg })
		})
	}
	
	newCommand(c) {
		var tbody = this.querySelector(`tbody[cat='${c.cat}']`)
		
		if(!tbody) {
			var thead = this.table.newElement('thead')
			
			var tr = thead.newElement('tr')
			var th = tr.newElement('th')
			th.colSpan = 2
			th.textContent = c.cat
			
			tbody = this.table.insertAfter(this.newElement('tbody', false), thead)
			tbody.setAttribute('cat', c.cat)
		}
		
		var tr = tbody.newElement('tr')
		tr.newElement('td').textContent = c.name
		tr.newElement('td').textContent = c.desc
		tr.newElement('td').textContent = c.arg
	}
}
