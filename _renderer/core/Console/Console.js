'use strict'

var style = `
:host {
	
}
::content {
	textarea { height: calc(~"100% - 3rem"); resize: none; margin-bottom: 1rem; font-size: 0.9em; }
	input { width: 100%; }
}
`

module.exports = class Console extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.console = this.newElement('textarea')
		this.console.placeholder = 'Console'
		this.console.disabled = true
		
		if(!('commandHistory' in this.ser)) this.ser.commandHistory = []
		this.commandHistoryIndex = this.ser.commandHistory.length
		
		this.input = this.newElement("input")
		this.input.placeholder = "Send command"
		
		// enter sends command
		this.input.on('keypress', e => e.keyCode == 13 && this.submitInput())
		
		// toggle tab when focus to input
		this.input.on('focus', e => { AppEvent('tabToggle', this); if(!e.isTrusted) this.input.focus(); })
		
		defineKeyShortcut('⌘Enter', 'Focus console input', 'Console')
		self.on('keydown', e => (e.metaKey || e.ctrlKey) && this.keyShortcut(e))
		
		defineKeyShortcut('Up/Down', 'Commands history', 'Console')
		this.input.on('keydown', e => this.historyCommand(e))
		
		// serial data
		self.on('serialData', e => { if(e.d.data == "ok\r") return; this.console.value += e.d.data; this.consoleScrollDown(); })
		//self.on('serialWrite', e => { this.console.value += e.d.data; this.consoleScrollDown(); })
		
		// clean console when connected
		self.on('connected', e => this.console.value = "")
		
		defineAppEvent('consoleClear', 'Clear console', 'Console')
		self.on('consoleClear', e => this.console.value = "")
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, title: 'Console', priority: -80 })
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
	
	keyShortcut(e) {
		e.keyCode == 13 && this.input.dispatchEvent(new Event('focus'))
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
