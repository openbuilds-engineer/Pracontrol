'use strict'

var style = `
::content label { white-space: nowrap; }
::content span { min-width: 3rem; display: inline-block; }
::content input[type='number'] { width: 5rem; }
`

module.exports = class Acceleration extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		var p = this.newElement('p', true, { textContent: 'Acceleration ' })
		p.newElement('small', true, { textContent: 'mm/sec^2' })
		p.newElement('br')

		var opt = { type: 'number', step: 1 }
		this.T = p.newElement('label', true, { innerHTML: '<span>Travel </span>'}).newElement('input', true, opt)
		this.T.on('input', e => this.set())
		p.newElement('br')
		this.P = p.newElement('label', true, { innerHTML: '<span>Printing </span>'}).newElement('input', true, opt)
		this.P.on('input', e => this.set())
		p.newElement('br')
		this.R = p.newElement('label', true, { innerHTML: '<span>Retract </span>'}).newElement('input', true, opt)
		this.R.on('input', e => this.set())
		
		self.on('serialEcho', e => this.echo(e.d))
	}
	
	set() {
		var val = `T${this.T.value} P${this.P.value} R${this.R.value}`
		AppEvent('serialWrite', { data: `M204 ${val}` })
	}
	
	value(msg) {
		var m = msg.match(/([0-9]+\.?[0-9]*)/g)
		this.T.value = m[3]
		this.P.value = m[1]
		this.R.value = m[2]
	}
	
	echo(msg) {
		if(msg.startsWith('M204')) return this.value(msg)
	}
}
