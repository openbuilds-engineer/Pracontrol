'use strict'

// Spiral flood fill algorithm
// by Pravdomil.cz
//
// Args
// 1) imgData
//      ctx2d.getImageData(0, 0, w, h)
//
// 2) channel
//      0 = R
//      1 = G
//      2 = B
//      3 = A
//      4 = Grayscale
//
// 3) fast
//      false (default)
//        rect search for next path
//      true
//        linear search for next path
// 

var module = module || {}
module.exports = (imgData, channel, fast) => new SpiralFloodFill(imgData, channel, fast).generate()

class SpiralFloodFill {
	constructor(imgData, channel, fast) {
		this.imgData = imgData
		this.ch = channel
		this.fast = fast
		
		if(isNaN(this.ch)) this.ch = 4
		
		this.w = imgData.width
		this.h = imgData.height
		
		this.getPrintPoints()
	}
	
	generate(newPathFunc) {
		var path = []
		var first
		while(first = this.findFirst(path)) {
			var x = first.x
			var y = first.y
			var a = this.printPoint(x, y)
			
			var p = [{ x, y, a }]
			
			var next
			while(next = this.getNext(p)) {
				next.a = this.printPoint(next.x, next.y)
				p.push(next)
			}
			
			path.push(p)
			newPathFunc && newPathFunc.apply(this, [p])
		}
		return path
	}
	
	printPoint(x, y) {
		var v = this.print[x][y]
		this.print[x][y] = 0
		return v
	}
	
	findFirst(path) {
		return this.fast ? this.linearSeach(path) : this.rectSearch(path)
	}
	
	linearSeach(path) {
		for(var y = 0; y < this.h; y++) {
			for(var x = 0; x < this.w; x++) {
				if(this.print[x][y]) return { x, y }
			}
		}
	}
	
	rectSearch(path) {
		var x0, y0, r
		
		if(path.length) {
			var p = path[path.length - 1]
			x0 = p[p.length - 1].x
			y0 = p[p.length - 1].y
			r = 2
		} else {
			x0 = 0
			y0 = 0
			r = 0
		}
		
		for(; r < Math.max(this.w, this.h); r++) {
			
			var x = x0 - r
			var xMax = r * 2 + 1
			
			var offsetX = (x < 0) ? x * -1 : 0
			x += offsetX - 1
			
			for(var x1 = offsetX; x1 < xMax; x1++) {
				
				x++
				
				if(x >= this.w) break
				
				var y = y0 - r
				var yMax = r * 2 + 1
					
				var offsetY = (y < 0) ? y * -1 : 0
				y += offsetY - 1
				
				for(var y1 = offsetY; y1 < yMax; y1++) {
					
					y++
					
					if(y >= this.h) break
					
					if(x1 != 0 && x1 != xMax - 1 && y1 != 0 && y1 != yMax - 1) continue
					
					if(this.print[x][y]) return { x, y }
				}
			}
		}
	}
	
	getNext(path) {
		var len = path.length
		
		var x0 = path[len - 1].x
		var y0 = path[len - 1].y
		
		var dX, dY
		if(len == 1) {
			dX = 0
			dY = 1
		} else {
			dX = x0 - path[len - 2].x
			dY = y0 - path[len - 2].y
		}
		
		var dir = this.getDirectionForDelta(dX, dY)
		
		for(var c = 0; c < dir.length; c++) {
			var x = x0 + dir[c].x
			var y = y0 + dir[c].y
			if(x < 0 || y < 0 || x >= this.w || y >= this.h) continue
			if(this.print[x][y]) return { x, y }
		}
	}
	
	getDirectionForDelta(dX, dY) {
		const top =    { x:  0, y: -1 }
		const right =  { x:  1, y:  0 }
		const bottom = { x:  0, y:  1 }
		const left =   { x: -1, y:  0 }
	
		const topLeft =     { x: -1,  y: -1 }
		const topRight =    { x:  1,  y: -1 }
		const bottomRight = { x:  1,  y:  1 }
		const bottomLeft =  { x: -1, y:  1 }
		
		var target
		
		if     (dX ==  0 && dY == -1) target = 'top'
		else if(dX ==  1 && dY ==  0) target = 'right'
		else if(dX ==  0 && dY ==  1) target = 'bottom'
		else if(dX == -1 && dY ==  0) target = 'left'
		else if(dX == -1 && dY == -1) target = 'top' // topLeft
		else if(dX ==  1 && dY == -1) target = 'right' // topRight
		else if(dX ==  1 && dY == 1) target = 'bottom' // bottomRight
		else if(dX == -1 && dY == 1) target = 'left' // bottomLeft
		
		var dir = []
		
		if(target == 'top') dir = [right, top, left, bottom]
		else if(target == 'right') dir = [bottom, right, top, left]
		else if(target == 'bottom') dir = [left, bottom, right, top]
		else if(target == 'left') dir = [top, left, bottom, right]
		
		dir.push(topLeft, topRight, bottomRight, bottomLeft)
		
		return dir
	}
	
	getPrintPoints() {
		this.print = new Array(this.w)
		for(var x = 0; x < this.w; x++) this.print[x] = new Uint8Array(this.h)
		
		this.forEachImage((x, y, p, i) => {
			if(this.ch <= 3) {
				
				var pass = p[i + this.ch] == 255
				
				this.print[x][y] = pass ? 255 - p[i] : 0
			}
			else if(this.ch == 4) {
				
				var grey = (p[i] + p[i + 1] + p[i + 2]) / 3
				var a = 255 - p[i + 3]
				grey = 255 - (grey + a)
				
				this.print[x][y] = grey
			}
		})
	}
	
	forEachImage(func) {
		var p = this.imgData.data
		
		for(var y = 0; y < this.h; y++) {
			for(var x = 0; x < this.w; x++) {
				
				var i = (this.w * y + x) * 4
				
				func(x, y, p, i)
			}
		}
	}
}
