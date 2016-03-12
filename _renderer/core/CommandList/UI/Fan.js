'use strict'

module.exports = class Fan extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p', true, { textContent: "Fan " })
		
		this.slider = p.newElement('input', true, { type: 'range', min: 0, max: 255, step: 1, value: 0 })
		this.slider.on('input', e => this.setSpeed(this.slider.value))
	}
	
	setSpeed(val) {
		AppEvent('serialWrite', { data: `M106 S${val}`, prepend: true })
	}
}
