'use strict'

var style = `
:host {
	order: 100;
}
::content {
	input:not([type='checkbox']), select { width: 100%; margin-bottom: 1rem; }
}
`

module.exports = class ConnectForm extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.newElement('p').textContent = "Connect"
		
		this.port = this.newElement('select')
		this.port.on('click', e => AppEvent('refreshPorts'))
		
		this.newElement('br')
		
		this.speed = this.newElement('input')
		this.speed.type = 'number'
		this.speed.value = this.ser.speed || 115200
		
		this.newElement('br')
		
		this.submit = this.newElement('input')
		this.submit.type = 'button'
		this.submit.on('click', e=> this.submitClick(e))
		
		var l = this.newElement('label')
		this.homeOnConnect = l.newElement('input')
		l.newText('Home X & Y after connect')
		this.homeOnConnect.type = 'checkbox'
		this.homeOnConnect.checked = this.ser.homeOnConnect
		this.homeOnConnect.on('change', e => this.ser.homeOnConnect = this.homeOnConnect.checked)
		self.on('deviceReady', e => this.ser.homeOnConnect && AppEvent('serialWrite', { data: 'G28 X Y', prepend: true }))
		
		self.on('refreshPorts', e => this.cleanPorts(e))
		self.on('newPort', e => this.newPort(e))
		self.on('connect', e => this.connect(e))
		self.on('connected', e => this.connected(e))
		self.on('disconnected', e => this.disconnected(e))
	}
	
	cleanPorts(e) {
		while (this.port.firstChild) this.port.removeChild(this.port.firstChild)
	}
	
	newPort(e) {
		var o = this.port.newElement('option')
		o.port = e.d.port
		o.textContent = e.d.port.comName.replace("/dev/cu.", "").replace(/-/g, " ")
		
		if(o.textContent == this.ser.last) {
			o.selected = true
			this.submitClick()
		}
	}
	
	connect(e) {
		this.ser.speed = this.speed.value
		this.submit.disabled = true;
		this.submit.value = 'Connecting';
	}
	
	connected(e) {
		this.ser.last = this.port.selectedOptions[0].textContent
		this.isConnected = true;
		this.submit.disabled = false;
		this.submit.value = 'Disconnect';
	}
	
	disconnected(e) {
		this.isConnected = false;
		this.submit.disabled = false;
		this.submit.value = 'Connect';
	}
	
	submitClick(e) {
		AppEvent(this.isConnected ? 'disconnect' : 'connect')
	}
}
