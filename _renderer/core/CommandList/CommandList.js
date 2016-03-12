'use strict'

var style = `
:host {
	top: -1rem; bottom: -1rem; left: -1rem; right: -1rem;
	position: absolute;
}

::content {
	
	left {
		flex: 0 0 auto;
		margin-bottom: 0;
		
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		
		tab {
			padding: 0.2rem 0.3rem;
			color: #fff;
			cursor: pointer;
			font-size: 0.85em;
			background-color: #333;
			display: block;
		
			&.active, &:hover { background-color: #666; }
		}
	}
	right {
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		top: 1rem;
	}
}
`

module.exports = class CommandList extends TabComponent {
	initCallback() {
		this.renderLess(style)
		
		defineAppEvent('newCommand', 'Add new item to commands table', 'Commands', "{ name: '', desc: '', cat: '', arg: '' }")
		self.on('newCommand', e => this.newCommand(e.d))
		
		var div = this.newElement('div', true, { className: 'column-system' })
		this.left = div.newElement('left')
		this.right = div.newElement('right')
		
		this.tabInit('CommandTab', this.left)
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, title: 'Commands', priority: -70 })
		AppEvent('toggleTab', this)
	}
	
	attachedCallback() {
		var gCode = require('./gCode').commands
		
		Object.keys(gCode).forEach(code => {
			var val = gCode[code]
			if(val.duplicate) return
			AppEvent('newCommand', { name: code, desc: val.title, cat: val.cat, arg: val.arg })
		})
	}
	
	newCommand(c) {
		var cat = this.left.querySelector(`tab[name='${c.cat}']`)
		var instance = cat ? cat.instance : this.right.newElement('div')
		
		if(!cat) AppEvent('newCommandTab', { instance: instance, title: c.cat })
		
		var module = moduleAvailable(`./UI/${c.cat}-${c.name}`)
		if(module) {
			instance.newElement(require(module), true, { command: c })
		}
		else {
			var ui = instance.newElement('p', true, { innerHTML: `<b>${c.name}</b> ${c.desc}`, title: c.arg || '' })
			ui.style.cursor = 'pointer'
			ui.on('click', e => AppEvent('consoleInputValue', c.name + ' '))
		}
	}
}

var moduleAvailable = m => { try { return require.resolve(m) } catch(e) { return false } }
