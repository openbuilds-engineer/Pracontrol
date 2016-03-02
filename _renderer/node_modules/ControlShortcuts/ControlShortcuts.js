'use strict'

module.exports = class ControlShortcuts extends WebComponentAbstract {
	initCallback() {
		this.deviceOk = false
		self.on('deviceOk', e => this.deviceOk = true)
		self.on('deviceNotOk', e => this.deviceOk = false)
		
		self.on('keydown', e => e.target == document.body && this.moveShortcut(e))
		defineKeyShortcut('Left', 'X–10 or with ⌥ –1', 'Move control')
		defineKeyShortcut('Right', 'X+10 or with ⌥ +1', 'Move control')
		defineKeyShortcut('Down', 'Y–10 or with ⌥ –1', 'Move control')
		defineKeyShortcut('Up', 'Y+10 or with ⌥ +1', 'Move control')
		defineKeyShortcut('–', 'Z–1 or with ⌥ –0.1', 'Move control')
		defineKeyShortcut('=', 'Z+1 or with ⌥ +0.1', 'Move control')
		
		self.on('keydown', e => e.target == document.body && this.keyShortcut(e))
		defineKeyShortcut('H', 'Home XY', 'gCode')
		defineKeyShortcut('⌥H', 'Home all', 'gCode')
		defineKeyShortcut('P', 'Current position is 0', 'gCode')
		defineKeyShortcut('Q', 'Clean buffer and power off', 'gCode')
	}
	
	keyShortcut(e) {
		if(e.metaKey || e.ctrlKey) return
		
		switch(e.keyCode) {
			case 72: AppEvent('serialWrite', { data: [`G28 ${e.altKey ? '' : 'XY'}`], prepend: true }); break
			case 80: AppEvent('serialWrite', { data: [`G92 X0 Y0 Z0`], prepend: true }); break
			case 81: AppEvent('serialClean'); AppEvent('serialWrite', { data: 'M81' }); break
		}
	}
	
	moveShortcut(e) {
		if(e.metaKey || e.ctrlKey) return
		
		if(e.repeat && !this.deviceOk) return
		
		var vel = e.altKey ? 1 : 10
		
		switch(e.keyCode) {
			case 37: this.move('X', vel * -1); break
			case 39: this.move('X', vel); break
			
			case 38: this.move('Y', vel); break
			case 40: this.move('Y', vel * -1); break
			
			case 187: this.move('Z', vel * .1); break
			case 189: this.move('Z', vel * -.1); break
		}
	}
	
	move(axis, vel) {
		AppEvent('serialWrite', { data: ['G91', `G0 ${axis} ${vel}`, 'G90', 'M400'], prepend: true })
	}
}
