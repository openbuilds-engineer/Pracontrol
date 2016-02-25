'use strict'

module.exports = class SerialBuffer extends WebComponentAbstract {
	initCallback() {
		
		this.buffer = []
		
		defineAppEvent('serialWrite', 'Send data to serial buffer', 'Serial buffer', "{ data: '' or [], prepend: false }")
		self.on('serialWrite', e => this.send(e.d.data, e.d.prepend))
		
		
		defineAppEvent('deviceReady', 'Device is communicating', 'Serial buffer')
		defineAppEvent('deviceNotReady', 'Device is not communicating', 'Serial buffer')
		this.deviceReady = false
		self.on('deviceReady', e => this.deviceReady = true)
		self.on('deviceNotReady', e => this.deviceReady = false)
		self.on('disconnected', e => new AppEvent('deviceNotReady'))
		
		self.on('connected', e => new AppEvent('serialDirectWrite', { data: "G4\n" }) )
		self.on('serialData', e => !this.deviceReady && new AppEvent('deviceReady'))
		
		
		defineAppEvent('deviceOk', 'Device ok', 'Serial buffer')
		defineAppEvent('deviceNotOk', 'Device busy', 'Serial buffer')
		this.deviceOk = false
		self.on('deviceOk', e => this.deviceOk = true)
		self.on('deviceNotOk', e => this.deviceOk = false)
		self.on('disconnected', e => new AppEvent('deviceNotOk'))
		
		self.on('deviceReady', e => new AppEvent('deviceOk'))
		self.on('serialData', e => this.checkOk(e))
		self.on('deviceOk', e => setImmediate(e => this.sendBuffer()))
		
		
		defineAppEvent('deviceReset', 'Device was reseted', 'Serial buffer')
		this.deviceStarted = false
		self.on('disconnected', e => this.deviceStarted = false)
		
		self.on('serialData', e => this.checkReset(e))
		self.on('deviceReset', e => new AppEvent('deviceReady'))
		self.on('deviceReset', e => new AppEvent('info', { msg: "device was reseted" }))
	}
	
	readyCallback() {
		new AppEvent('bufferChange')
	}
	
	checkReset(e) {
		if(e.d.data != "start\r") return
		if(this.deviceStarted) new AppEvent('deviceReset')
		this.deviceStarted = true
	}
	
	checkOk(e) {
		if(!this.deviceReady) return;
		if(e.d.data == "ok\r") new AppEvent('deviceOk');
	}
	
	send(data, prepend) {
		if(Array.isArray(data)) {
			if(prepend) data.reverse()
			data.forEach(item => this.addToBuffer(item, prepend))
		} else {
			this.addToBuffer(data, prepend)
		}
		new AppEvent('bufferChange')
		this.sendBuffer()
	}
	
	addToBuffer(data, prepend) {
		if(!data) return;
		prepend ? this.buffer.unshift(data + "\n") : this.buffer.push(data + "\n")
	}
	
	sendBuffer() {
		if(!this.deviceOk) return
		
		var data = this.buffer.shift()
		if(!data) return;
		
		new AppEvent('bufferChange')
		new AppEvent('deviceNotOk')
		new AppEvent('serialDirectWrite', { data: data })
	}
}
