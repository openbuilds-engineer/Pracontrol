'use strict'

var style = `
:host {
	overflow-x: hidden;
	overflow-y: auto;
	display: block;
	height: 100%;
}

::content {
	textarea { height: 8rem; }
	canvas { width: 100%; border: 1px solid #ddd; box-sizing: border-box; image-rendering: pixelated; }
}
`

var path = require('path')

module.exports = class Slicer25D extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		var div = this.newElement('div', true, { className: 'column-system' })
		this.left = div.newElement('div')
		this.slicer = div.newElement(require('./slicer.js'), true, { parent: this })
		this.slicer.style.flexGrow = 3
		
		this.left.newElement('h1').textContent = '2.5D Slicer'
		
		this.recent = this.left.newElement('p').newElement('select')
		this.recent.newElement('option', true, { textContent: 'Load recent files' })
		this.recent.on('input', e => this.slice())
		this.ser.recent = this.ser.recent || []
		this.ser.recent = this.ser.recent.slice(-5)
		this.ser.recent.forEach(p => this.newRecentOption(p))
		
		var l = this.left.newElement('p').newElement('label')
		var fidelityText = l.newText('')
		var opt = { type: "range", min: 1, max: 10, step: 0.05, value: this.ser.fidelity || 5 }
		l.newElement('br')
		this.fidelity = l.newElement('input', true, opt)
		this.fidelity.on('input', e => {
			this.ser.fidelity = this.fidelity.value
			fidelityText.textContent = `Fidelity ${ Math.round((72 / 256) / this.ser.fidelity * 1000) / 100 }` 
		})
		this.fidelity.dispatchEvent(new Event('input'))
		
		var l = this.left.newElement('p').newElement('label')
		var passText = l.newText('')
		var opt = { type: "range", min: 1, max: 100, step: 1, value: this.ser.pass || 1 }
		l.newElement('br')
		this.pass = l.newElement('input', true, opt)
		this.pass.on('input', e => {
			this.ser.pass = this.pass.value
			passText.textContent = `Passes ${this.ser.pass}` 
		})
		this.pass.dispatchEvent(new Event('input'))
		
		var l = this.left.newElement('p').newElement('label', true, { textContent: 'Controling gCode' })
		this.powerCmd = l.newElement('textarea')
		this.powerCmd.on('input', e => this.ser.powerCmd = this.powerCmd.value)
		this.powerCmd.value = this.ser.powerCmd || 'G0 X${$.x} Y${$.y} \\\nZ${$.s * -1 / 1000}'
		l.newElement('pre').textContent = '$ = { x, y, s, p }'
		
		var l = this.left.newElement('p').newElement('label', true, { textContent: 'Slicing channel ' })
		this.channel = l.newElement('select')
		this.channel.newElement('option').textContent = 'Red'
		this.channel.newElement('option').textContent = 'Green'
		this.channel.newElement('option').textContent = 'Blue'
		this.channel.newElement('option').textContent = 'Alpha'
		this.channel.newElement('option').textContent = 'Grayscale'
		this.channel.on('input', e => this.ser.channel = this.channel.selectedIndex)
		this.ser.channel = isNaN(this.ser.channel) ? 4 : this.ser.channel
		this.channel.options[this.ser.channel].selected = true
		
		self.on("newFile", e => this.newFile(e))
	}
	
	newFile(e) {
		var p = e.d[0].path
		var ext = p.substr(-3)
		
		if(['svg', 'bmp', 'png', 'jpg', 'gif'].indexOf(ext) == -1) return
		
		this.ser.recent.push(p)
		this.newRecentOption(p, true)
		this.slice()
	}
	
	newRecentOption(p, selected) {
		var opt = this.recent.newElement('option', false, { path: p, textContent: path.basename(p), selected })
		this.recent.insertAfter(opt, this.recent.children[0])
	}
	
	slice() {
		if(!this.recent.selectedOptions.length) return
		this.slicer.slice(this.recent.selectedOptions[0].path)
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, name: "2.5D" })
	}
}
