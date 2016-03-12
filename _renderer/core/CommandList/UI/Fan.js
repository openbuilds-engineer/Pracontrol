'use strict'

module.exports = class Fan extends WebComponentAbstract {
	initCallback() {
		
		this.heading = this.newElement('h3', true, { textContent: "Fan speed" })
		
		var p = this.newElement('p')
		
		var off = p.newElement('a', true, { textContent: 'Off', className: 'button' })
		off.on('click', e => this.setSpeed(0))
		
		p.newText(' ')
		
		this.slider = p.newElement('input', true, { type: 'range', min: 0, max: 255, step: 1, value: 0 })
		this.slider.on('input', e => this.setSpeed(this.slider.value))
		
		p.newText(' ')
		
		var on = p.newElement('a', true, { textContent: 'On', className: 'button' })
		on.on('click', e => this.setSpeed(255))
	}
	
	setSpeed(val) {
		this.slider.value = val
		this.heading.textContent = `Fan speed ${val}`
		AppEvent('serialWrite', { data: `M106 S${val}`, prepend: true })
	}
}
