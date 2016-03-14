'use strict'

var style = `
::content label { white-space: nowrap; }
::content input[type='number'] { width: 5rem; }
`

module.exports = class Speed extends WebComponentAbstract {
	initCallback() {
		this.renderCss(style)
		
		var AxisSettings = require('./AxisSettings')
		
		this.newElement(AxisSettings, true, { opt: { name: 'Max acceleration by axis', gCode: 'M201' } })
		this.newElement(AxisSettings, true, { opt: { name: 'Max feedrate', gCode: 'M203' } })
		this.newElement(AxisSettings, true, { opt: { name: 'Axis steps per unit', gCode: 'M92' } })
	}
}