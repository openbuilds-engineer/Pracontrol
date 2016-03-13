'use strict'

module.exports = class RelativeAbsolute extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p', true, { textContent: "Coordinates " })
		p.newElement('a', true, { textContent: 'Absolute', className: 'button' }).on('click', e => this.send('G90'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Relative', className: 'button' }).on('click', e => this.send('G91'))
		
		var p = this.newElement('p', true, { textContent: "Extruder " })
		p.newElement('a', true, { textContent: 'Absolute', className: 'button' }).on('click', e => this.send('M82'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Relative', className: 'button' }).on('click', e => this.send('M83'))
	}
	
	send(val) {
		AppEvent('serialWrite', { data: val, prepend: true })
	}
}
