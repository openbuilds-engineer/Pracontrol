'use strict'

module.exports = class Laser extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p', true, { textContent: "Laser " })
		
		var slider = p.newElement('input', true, { type: 'range', min: 0, max: 255, step: 1, value: 0 })
		slider.on('input', e => this.setPower(slider.value))
	}
	
	setPower(val) {
		AppEvent('serialWrite', { data: `M3 S${val}`, prepend: true })
	}
}
