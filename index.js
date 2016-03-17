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
		
		this.fidelityLabel = this.left.newElement('p')
		var opt = { type: "range", min: 1, max: 10, step: 1, value: this.ser.fidelity || 5 }
		this.fidelity = this.left.newElement('p').newElement('input', true, opt)
		this.fidelity.on('input', e => {
			this.ser.fidelity = this.fidelity.value
			this.fidelityLabel.textContent = 'Fidelity ' + this.ser.fidelity
		})
		this.fidelity.dispatchEvent(new Event('input'))
		
		this.left.newElement('p').textContent = 'Slicing channel'
		this.channel = this.left.newElement('p').newElement('select')
		this.channel.newElement('option').textContent = 'Red'
		this.channel.newElement('option').textContent = 'Green'
		this.channel.newElement('option').textContent = 'Blue'
		this.channel.newElement('option').textContent = 'Alpha'
		this.channel.newElement('option').textContent = 'Grayscale'
		this.channel.on('input', e => this.ser.channel = this.channel.selectedIndex)
		this.ser.channel = isNaN(this.ser.channel) ? 4 : this.ser.channel
		this.channel.options[this.ser.channel].selected = true
		
		this.left.newElement('p').textContent = 'Controling gCode'
		this.powerCmd = this.left.newElement('p').newElement('textarea')
		this.powerCmd.on('input', e => this.ser.powerCmd = this.powerCmd.value)
		this.powerCmd.value = this.ser.powerCmd || 'G0 X${p.x} Y${p.y} \\\nZ${p.a * -1 / 1000}'
		
		this.left.newElement('pre').textContent = 'var p = {\n  x: <#>,\n  y: <#>,\n  s: <0-255>\n}'
		
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
