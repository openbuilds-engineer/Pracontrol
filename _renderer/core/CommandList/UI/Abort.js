'use strict'

module.exports = class Abort extends WebComponentAbstract {
	initCallback() {
	
		var p = this.newElement('p')
		p.newElement('a', true, { textContent: 'Emergency stop', className: 'button' }).on('click', e => this.send('M112'))
		p.newElement('br')
		p.newElement('a', true, { textContent: 'Abort planned moves', className: 'button' }).on('click', e => this.send('M410'))
	}

	send(val) {
		AppEvent('serialDirectWrite', { data: val + '\n' })
		if(val == 'M410') AppEvent('info', { msg: 'Moves aborted. Motors can be out of sync.' })
	}
}
