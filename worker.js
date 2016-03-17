'use strict'

onmessage = e => e.data.func && self[e.data.func].apply(this, e.data.arg)

var pathArr = []

var slice = (imgData, channel) => {
	var fill = new SpiralFloodFill(imgData, channel)
	pathArr = fill.generate(p => self.postMessage({ func: 'newSlicePath', arg: [ p ] }))
	self.postMessage({ func: 'sliceDone' })
}

var gCode = function(powerGCode, fidelity) {
	this.gCode = []
	
	this.gCodePush = (p) => {
		var cmd = eval('`' + powerGCode + '`').split("\n")
		this.gCode.push.apply(this.gCode, cmd)
	}
	
	pathArr.forEach(path => {
		path.forEach((p, i) => {
			
			p.x = Math.round(p.x / fidelity * 1000) / 1000
			p.y = Math.round(p.y / fidelity * 1000) / 1000
			p.s = Math.round(p.s * 1000) / 1000
			
			if(i == 0) this.gCodePush({ x: p.x, y: p.y, s: 0 })
			
			this.gCodePush(p)
			
			if(i == path.length - 1) this.gCodePush({ x: p.x, y: p.y, s: 0 })
		})
	})
	self.postMessage({ func: 'gCodeDone', arg: [ this.gCode ] })
}

