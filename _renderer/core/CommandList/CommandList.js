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
		height: calc(~"100% - 2rem");
		overflow-x: hidden;
		overflow-y: auto;
		padding: 1rem 0;
		
		> div > * { flex-basis: 15rem; }
	}
}
`

module.exports = class CommandList extends TabComponent {
	initCallback() {
		this.renderLess(style)
		
		defineAppEvent('newCommand', 'Add new item to commands table', 'Commands', 'see ./gCode.js')
		self.on('newCommand', e => this.newCommand(e.d))
		
		var div = this.newElement('div', true, { className: 'column-system' })
		this.left = div.newElement('left')
		this.right = div.newElement('right')
		
		this.tabInit('CommandTab', this.left)
		self.on('newCommandTab', e => this.right.appendChild(e.d.instance))
		
		this.skipCat = []
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, name: 'Commands', priority: -70 })
		AppEvent('toggleTab', this)
	}
	
	attachedCallback() {
		var gCode = require('./gCode')
		
		Object.keys(gCode).forEach(code => {
			var val = gCode[code]
			if(val.duplicate) return
			AppEvent('newCommand', val)
		})
	}
	
	newCommand(c) {
		if(this.skipCat.includes(c.cat)) return
			
		var tab = this.left.querySelector(`tab[name='${c.tab}']`)
		if(!tab) {
			tab = { name: c.tab, instance: this.newElement('div', false, { className: 'column-system' }) }
			AppEvent('newCommandTab', tab)
		}
		
		var module = moduleAvailable(`./UI/${c.cat}`)
		if(module) {
			this.skipCat.push(c.cat)
			tab.instance.newElement(require(module), true, { command: c, parent: this })
		}
		else {
			var ui = tab.instance.newElement('p', true, { innerHTML: `<b>${c.gcode}</b> ${c.name}`, title: c.arg || '' })
			ui.style.cursor = 'pointer'
			ui.on('click', e => AppEvent('consoleInputValue', c.gcode + ' '))
		}
	}
}

var moduleAvailable = m => { try { return require.resolve(m) } catch(e) { return false } }
