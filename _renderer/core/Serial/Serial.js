'use strict'

var serialPort = null // lazy load

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
		AppEvent('refreshPorts')
		AppEvent('disconnected')
		
		AppEvent('newDashboard', { instance: this })
	}
	
	refreshPorts(e) {
		serialPort = serialPort || require('serialport')
		serialPort.list( (e, ports) => {
			if(e) throw e
			ports.reverse().forEach(p => AppEvent('newPort', { port: p }) )
		})
	}
	
	disconnect(e) {
		if(this.serial) this.serial.close()
	}
	
	connect(e) {
		if(!this.connectForm.port.selectedOptions) {
			AppEvent('disconnected')
			throw new Error("No ports selected")
		}
		
		if(!this.connectForm.speed.value) {
			AppEvent('disconnected')
			throw new Error("No speed entered")
		}
		
		var port = this.connectForm.port.selectedOptions[0].port.comName
		
		this.serial = new serialPort.SerialPort(port, {
			parser: serialPort.parsers.readline("\n"),
			baudrate: this.connectForm.speed.value,
		}, false);
		
		this.serial.open(e => {
			if (e) { AppEvent('disconnected'); throw e; }
			AppEvent('connected')
		})
		this.serial.on('close', e => { AppEvent('disconnected'); if(e) throw e; })
		this.serial.on('data', data => AppEvent('serialData', { data }))
	}
	
	send(data) {
		this.serial.write(data)
	}
}
