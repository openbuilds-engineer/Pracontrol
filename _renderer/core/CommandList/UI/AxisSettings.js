'use strict'

var style = `
::content label { white-space: nowrap; }
::content input[type='number'] { width: 5rem; }
`

module.exports = class AxisSettings extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		self.on('serialEcho', e => this.echo(e.d))
	}
	
	readyCallback() {
		
		var p = this.newElement('p', true, { textContent: this.opt.name })
		p.newElement('br')
		
		var opt = { type: 'number', step: 1 }
		this.X = p.newElement('label', true, { textContent: 'X '}).newElement('input', true, opt)
		this.X.on('input', e => this.set())
		p.newText(' ')
		this.Y = p.newElement('label', true, { textContent: 'Y '}).newElement('input', true, opt)
		this.Y.on('input', e => this.set())
		p.newElement('br')
		this.Z = p.newElement('label', true, { textContent: 'Z '}).newElement('input', true, opt)
		this.Z.on('input', e => this.set())
		p.newText(' ')
		this.E = p.newElement('label', true, { textContent: 'E '}).newElement('input', true, opt)
		this.E.on('input', e => this.set())
		p.newElement('br')
	}
	
	set() {
		var val = `X${this.X.value} Y${this.Y.value} Z${this.Z.value} E0 S${this.E.value}`
		AppEvent('serialWrite', { data: `${this.opt.gCode} ${val}` })
	}
	
	value(msg) {
		var m = msg.match(/([0-9]+\.?[0-9]*)/g)
		this.X.value = m[1]
		this.Y.value = m[2]
		this.Z.value = m[3]
		this.E.value = m[5]
	}
	
	echo(msg) {
		if(msg.startsWith(this.opt.gCode)) return this.value(msg)
	}
}
