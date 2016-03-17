'use strict'

var fs = require('fs')
var path = require('path')

module.exports = class Slicer25D_Slicer extends WebComponentAbstract {
	initCallback() {
		this.rinfo = this.newElement('div', true)
		this.rinfo.style.float = 'right'
		
		this.info = this.newElement('div', true, { textContent: 'Drop image here' })
		this.info.style.minHeight = '2rem'
		
		var opt = { type: "range", min: 0, max: 0, step: 1, value: 0 }
		this.slider = this.newElement('input', true, opt)
		this.slider.style.width = "100%"
		this.slider.on('input', e => this.replay())
		
		this.canvas = this.newElement('canvas')
		this.ctx = this.canvas.getContext('2d')
	}
	
	slice(p) {
		if(!p) return
		
		this.startWorker()
			
		this.rinfo.textContent = ''
		this.info.textContent = 'Reading... '
		this.getImagePath(p).then(path => {
			var img = new Image()
			img.src = path
			img.on('load', e => this.renderImage(img))
		})
	}
	
	getImagePath(path) {
		return new Promise((resolve, reject) => {
			if(path.substr(-3) == 'svg') {
				var svg = fs.readFile(path, 'utf-8', (e, data) => {
					if(e) throw e
					// turn off antialias
					data = data.replace('</svg>', '<style>* { shape-rendering: crispEdges; text-rendering: optimizeSpeed; }</style></svg>')
					var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
					resolve(window.URL.createObjectURL(blob))
				})
			} else {
				resolve(path)
			}
		})
	}
	
	startWorker() {
		if(this.w) this.w.terminate()
		
		this.w = new Worker(path.join(__dirname, 'worker.js'))
		this.w.postMessage({ func: 'importScripts', arg: [path.join(__dirname, 'spiral-flood-fill.js')] })
		this.w.onmessage = e => e.data.func && this[e.data.func].apply(this, e.data.arg)
			
		this.path = []
		this.gCode = []
		this.slider.max = 0
	}
	
	renderImage(domImg) {
		this.info.textContent = 'Rendering...'
		
		var w = domImg.width / 72 * 25.6 * this.parent.ser.fidelity
		var h = domImg.height / 72 * 25.6 * this.parent.ser.fidelity
		
		this.canvas.width = w
		this.canvas.height = h
		
		this.ctx.clearRect(0, 0, w, h)
		this.ctx.drawImage(domImg, 0, 0, w, h)
		var imgData = this.ctx.getImageData(0, 0, w, h)
		
		this.info.textContent = 'Slicing...'
		this.w.postMessage({ func: "slice", arg: [ imgData, this.parent.ser.channel ] })
	}
	
	newSlicePath(path) {
		this.path.push(path)
		this.slider.max = +this.slider.max + path.length
		this.rinfo.textContent = `${this.path.length} paths ${this.slider.max} points`
	}
	
	sliceDone() {
		if(!this.path.length) {
			this.info.textContent = 'No paths, try diferrent slicing channel.'
			
			var a = this.info.newElement('a', true, { textContent: 'Reslice', className: 'button' })
			a.on('click', e => this.parent.slice())
			return
		}
		this.info.textContent = 'Generating gCode...'
		this.w.postMessage({ func: "gCode", arg: [ this.parent.powerCmd.value, this.parent.ser.fidelity, this.parent.ser.pass ] })
		
		this.slider.value = this.slider.max
		this.replay()
	}
	
	gCodeDone(gCode) {
		this.gCode = gCode
		
		this.info.textContent = 'Ready for '
		var a = this.info.newElement('a', true, { textContent: 'Print', className: 'button' })
		a.on('click', e => this.print())
		this.info.newText(' or ')
		
		var a = this.info.newElement('a', true, { textContent: 'Reslice', className: 'button' })
		a.on('click', e => this.parent.slice())
	}
	
	print(e) {
		AppEvent('serialWrite', { data: this.gCode })
	}
	
	replay() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		
		var val = +this.slider.value
		var count = 0
		loop:
		for(var i = 0; i < this.path.length; i++) {
			var path = this.path[i]
			for(var c = 0; c < path.length; c++) {
				if(count++ > val) break loop
				
				var p = path[c]
				this.ctx.fillStyle = `rgb(${255 - p.s}, ${255 - p.s}, ${255 - p.s})`
				this.ctx.fillRect(p.x, p.y, 1, 1)
			}	
		}
	}
}
