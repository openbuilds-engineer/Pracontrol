'use strict'

module.exports = class SpeedFactor extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p', true, { textContent: "Speed " })
		
		var slider = p.newElement('input', true, { type: 'range', min: 0, max: 100, step: 1, value: 100 })
		slider.on('input', e => this.setSpeed(slider.value))
	}
	
	setSpeed(val) {
		AppEvent('serialWrite', { data: `M220 S${val}`, prepend: true })
	}
}
