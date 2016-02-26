'use strict'

var serialPort = require("serialport")

module.exports = class Serial extends WebComponentAbstract {
	initCallback() {
		
		this.connectForm = this.newElement(require('./ConnectForm'))
		
		this.serial = null
		this.buffer = this.newElement(require('./SerialBuffer'), false, { parent: this })
		this.status = this.newElement(require('./SerialStatus'), false, { parent: this })
		
		defineAppEvent('refreshPorts', 'Reload port list', 'Serial')
		defineAppEvent('newPort', 'New port found', 'Serial', "{ port: <port> }")
		self.on('refreshPorts', e => this.refreshPorts(e))
		
		defineAppEvent('connect', 'Attempt to connect', 'Serial')
		defineAppEvent('connected', 'Port connected', 'Serial')
		self.on('connect', e => this.connect(e))
		
		defineAppEvent('disconnect', 'Attempt to disconnect', 'Serial')
		defineAppEvent('disconnected', 'Port disconnected', 'Serial')
		self.on('disconnect', e => this.disconnect(e))
		self.on('disconnected', e => this.serial = null)
		
		defineAppEvent('serialData', 'New data from port', 'Serial', "{ data: '' }")
		defineAppEvent('serialDirectWrite', 'Write data to port and skip buffer', 'Serial', "{ data: '' }")
		self.on('serialDirectWrite', e => this.send(e.d.data))
		
		// disconnect on close
		self.on('beforeunload', e => this.disconnect(e))
	}
	
	readyCallback() {
		new AppEvent('refreshPorts')
		new AppEvent('disconnected')
		
		new AppEvent('newDashboard', { instance: this })
	}
	
	refreshPorts(e) {
		serialPort.list( (e, ports) => {
			if(e) throw e
			ports.reverse().forEach(p => new AppEvent('newPort', { port: p }) )
		})
	}
	
	disconnect(e) {
		if(this.serial) this.serial.close()
	}
	
	connect(e) {
		if(!this.connectForm.port.selectedOptions) {
			new AppEvent('disconnected')
			throw new Error("No ports selected")
		}
		
		if(!this.connectForm.speed.value) {
			new AppEvent('disconnected')
			throw new Error("No speed entered")
		}
		
		var port = this.connectForm.port.selectedOptions[0].port.comName
		
		this.serial = new serialPort.SerialPort(port, {
			parser: serialPort.parsers.readline("\n"),
			baudrate: this.connectForm.speed.value,
		}, false);
		
		this.serial.open(e => {
			if (e) { new AppEvent('disconnected'); throw e; }
			new AppEvent('connected')
		})
		this.serial.on('close', e => { new AppEvent('disconnected'); if(e) throw e; })
		this.serial.on('data', data => new AppEvent('serialData', { data }))
	}
	
	send(data) {
		this.serial.write(data)
	}
}
