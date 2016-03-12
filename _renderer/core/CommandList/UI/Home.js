'use strict'

module.exports = class Home extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p', true, { textContent: 'Home ' })
		
		p.newElement('a', true, { textContent: 'X', className: 'button' }).on('click', e => this.home('X'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Y', className: 'button' }).on('click', e => this.home('Y'))
		p.newText(' ')
		p.newElement('a', true, { textContent: 'Z', className: 'button' }).on('click', e => this.home('Z'))
	}
	
	home(val) {
		AppEvent('serialWrite', { data: 'G28 ' + val, prepend: true })
	}
}