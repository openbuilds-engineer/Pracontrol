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
		
		background-color: #333;
		
		tab {
			display: block;
			cursor: pointer;
			color: #fff;
			font-size: 0.85em;
			padding: 0.2rem 0.3rem;
		
			&.active, &:hover { background-color: #666; }
		}
	}
	right {
		height: calc(~"100% - 2rem");
		overflow-x: hidden;
		overflow-y: auto;
		padding: 1rem;
		padding-left: 0;
		
		> * > * { flex-basis: 15rem; }
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
			tab = { name: c.tab, instance: this.newElement(FlexBalanced, false) }
			AppEvent('newCommandTab', tab)
		}
		
		var module = moduleAvailable(`./UI/${c.cat}`)
		if(module) {
			this.skipCat.push(c.cat)
			tab.instance.newElement(require(module), true, { command: c, parent: this })
		}
		else {
			var p = tab.instance.newElement('p')
			var a = p.newElement('a')
			
			if(c.arg === null) {
				a.textContent = c.name
				a.classList.add('button')
			} else {
				a.newElement('b', true, { textContent: c.gcode })
				a.newText(' ' + c.name)
				a.newElement('br')
				a.newElement('small', true, { textContent: c.arg || ' ' })
			}
			
			a.on('click', e => AppEvent('consoleInputValue', c.gcode + ' '))
			a.style.cursor = 'pointer'
		}
		
		tab.instance.balance()
	}
}

var moduleAvailable = m => { try { return require.resolve(m) } catch(e) { return false } }
