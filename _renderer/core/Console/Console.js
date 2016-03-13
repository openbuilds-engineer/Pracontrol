'use strict'

var style = `
:host {
	
}
::content {
	console {
		display: block; overflow: scroll;
		height: calc(~"100% - 3rem"); margin-bottom: 1rem;
		white-space: pre-wrap; font-size: 0.9em; 
	}
	input { width: 100%; }
}
`

module.exports = class Console extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.console = this.newElement('console')
		
		if(!('commandHistory' in this.ser)) this.ser.commandHistory = []
		this.commandHistoryIndex = this.ser.commandHistory.length
		
		this.input = this.newElement("input", true, { placeholder: "Send command" })
		
		// enter sends command
		this.input.on('keypress', e => e.keyCode == 13 && this.submitInput())
		
		// toggle tab when focus to input
		this.input.on('focus', e => { AppEvent('toggleTab', this); if(!e.isTrusted) this.input.focus(); })
		
		defineKeyShortcut('⌘Enter', 'Focus console input', 'Console')
		self.on('keydown', e => (e.metaKey || e.ctrlKey) && e.keyCode == 13 && this.focus())
		
		defineKeyShortcut('Up/Down', 'Commands history', 'Console')
		this.input.on('keydown', e => this.historyCommand(e))
		
		// serial data
		defineAppEvent('serialEcho', 'Device sends echo: message', 'Console', "''")
		self.on('serialData', e => this.serialData(e.d.data))
		this.firstPart = ''
		
		// clean console when connected
		self.on('connected', e => this.console.textContent = "")
		
		defineAppEvent('consoleClear', 'Clear console', 'Console')
		self.on('consoleClear', e => this.console.textContent = "")
			
		defineAppEvent('consoleInputValue', 'Set console input value and focus it', 'Console', "''")
		self.on('consoleInputValue', e => { this.input.value = e.d; this.focus() })
	}
	
	serialData(data) {
		if(data == "start\r") return
		if(data == "ok\r") return
		
		if(data.startsWith('Error:')) throw new Error(data)
		if(data.startsWith('Resend:')) throw new Error(data)
		if(data.startsWith('echo:')) {
			data = data.substr(5).trim()
			
			AppEvent('serialEcho', data)
		
			if(this.firstPart) { data = this.firstPart + data; this.firstPart = '' }
			else if(data.endsWith(':')) { this.firstPart = data + ' '; return }
		
			data = '🅘 ' + data
		}
		
		this.console.textContent += data + '\n'
		this.consoleScrollDown()
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, name: 'Console', priority: -80 })
	}
	
	historyCommand(e) {
		var dir
		if(e.keyCode == 38) dir = -1
		else if(e.keyCode == 40) dir = 1
		if(!dir) return
		
		e && e.preventDefault()
		
		var newIndex = this.commandHistoryIndex + dir
		if(newIndex < 0 || newIndex >= this.ser.commandHistory.length) return
		
		this.commandHistoryIndex = newIndex
		
		this.input.value = this.ser.commandHistory[this.commandHistoryIndex]
	}
	
	focus() {
		 this.input.dispatchEvent(new Event('focus'))
	}
	
	consoleScrollDown() {
		this.console.scrollTop = this.console.scrollHeight
	}
	
	submitInput() {
		if(!this.input.value) return
		
		this.commandHistoryIndex = this.ser.commandHistory.push(this.input.value)
		
		var e = AppEvent('serialWrite', { data: this.input.value, prepend: true })
		this.input.value = ""
		
		this.consoleScrollDown()
	}
}
