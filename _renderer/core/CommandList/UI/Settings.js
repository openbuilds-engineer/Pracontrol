'use strict'

module.exports = class Settings extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p')
		p.newElement('a', true, { textContent: 'Read saved settings', className: 'button' }).on('click', e => this.send('M503'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Factory default', className: 'button' }).on('click', e => this.send('M502'))
		
		var p = this.newElement('p', true, { textContent: "Current settings " })
		p.newElement('a', true, { textContent: 'Read', className: 'button' }).on('click', e => this.send('M501'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Save', className: 'button' }).on('click', e => this.send('M500'))
	}
	
	send(val) {
		AppEvent('serialWrite', { data: val, prepend: true })
	}
}
