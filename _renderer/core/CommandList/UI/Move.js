'use strict'

var style = `
::content label { white-space: nowrap; }
::content input { width: 40%; }
`

module.exports = class Move extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		var p = this.newElement('p')
		
		var opt = { type: 'number', step: 1, value: 0 }
		
		var X = p.newElement('label', true, { textContent: 'X '}).newElement('input', true, opt)
		X.on('input', e => this.move({ X: X.value }))
		
		p.newText(' ')
		
		var Y = p.newElement('label', true, { textContent: 'Y '}).newElement('input', true, opt)
		Y.on('input', e => this.move({ Y: Y.value }))
		
		p.newElement('br')
		
		opt.step *= .1
		
		var Z = p.newElement('label', true, { textContent: 'Z '}).newElement('input', true, opt)
		Z.on('input', e => this.move({ Z: Z.value }))
		
		p.newText(' ')
		
		var E = p.newElement('label', true, { textContent: 'E '}).newElement('input', true, opt)
		E.on('input', e => this.move({ E: E.value }))
	}
	
	move(val) {
		var gCode = 'G1 '
		Object.keys(val).forEach(k => gCode += `${k}${val[k]} ` )
		AppEvent('serialWrite', { data: gCode, prepend: true })
	}
}
