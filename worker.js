'use strict'

onmessage = e => e.data.func && self[e.data.func].apply(this, e.data.arg)

var pathArr = []

var slice = (imgData, channel) => {
	var fill = new SpiralFloodFill(imgData, channel)
	pathArr = fill.generate(p => self.postMessage({ func: 'newSlicePath', arg: [ p ] }))
	self.postMessage({ func: 'sliceDone' })
}

var gCode = function(powerGCode, fidelity, passes) {
	this.gCode = []
	
	this.gCodePush = $ => this.gCode.push.apply(this.gCode, eval('`' + powerGCode + '`').split("\n"))
	
	for(var pass = 1; pass <= passes; pass++) {
		pathArr.forEach(path => {
			path.forEach((point, i) => {
				
				if(pass == 1) {
					point.x = Math.round(point.x / fidelity * 1000) / 1000
					point.y = Math.round(point.y / fidelity * 1000) / 1000
					point.s = Math.round(point.s * 1000) / 1000
				}
				
				if(i == 0) this.gCodePush({ x: point.x, y: point.y, s: 0, p: pass })
				
				this.gCodePush({ x: point.x, y: point.y, s: point.s, p: pass })
				
				if(i == path.length - 1) this.gCodePush({ x: point.x, y: point.y, s: 0, p: pass })
			})
		})
	}
	self.postMessage({ func: 'gCodeDone', arg: [ this.gCode ] })
}

