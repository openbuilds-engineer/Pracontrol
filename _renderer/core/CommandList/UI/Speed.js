/*
	{ tab: "Control", cat: "Speed", gcode: "M92", name: "Axis steps per unit", arg: "X<#> Y<#> Z<#> E<#>" },
	{ tab: "Control", cat: "Speed", gcode: "M201", name: "Max acceleration for print moves", arg: "X<#> Y<#> Z<#> E<#> (s^2)" },
	{ tab: "Control", cat: "Speed", gcode: "M203", name: "Maximum feedrate", arg: "X<#> Y<#> Z<#> E<#> (mm/sec)" },
	{ tab: "Control", cat: "Speed", gcode: "M204", name: "Acceleration set", arg: "P<#> R<#> T<#> (Printing Retract Travel) (mm/sec^2)" },
	{ tab: "Control", cat: "Speed", gcode: "M205", name: "Advanced settings set", arg: "S = Min feed rate (mm/s) T = Min travel feed rate (mm/s) B = Min segment time (µs) X = Max XY jerk (mm/s/s) Z = Max Z jerk (mm/s/s) E = Max E jerk (mm/s/s)" },
	{ tab: "Control", cat: "Speed", gcode: "M220", name: "Speed factor set", arg: "S<0-100>" },
*/

'use strict'

module.exports = class Speed extends WebComponentAbstract {
	initCallback() {
		
		var p = this.newElement('p')
		p.textContent = 'Speed control'
		
		// not implemented
	}
}
