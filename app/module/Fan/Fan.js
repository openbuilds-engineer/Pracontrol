'use strict'

var fs = require('fs');

var style = `
:host {
	order: 300;
}

::content {
	
}
`

module.exports = class Fan extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		this.newElement('p').textContent = "Fan speed"
		this.slider = this.newElement('input')
		this.slider.type = 'range'
		this.slider.min = 0
		this.slider.max = 255
		this.slider.step = 1
		this.slider.value = 0
		this.slider.on('input', e => this.setSpeed(this.slider.value))
	}
	
	readyCallback() {
		AppEvent('newDashboard', { instance: this })
	}
	
	setSpeed(val) {
		AppEvent('serialWrite', { data: `M106 S${val}`, prepend: true })
	}
}
