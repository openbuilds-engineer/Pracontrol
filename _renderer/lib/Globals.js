'use strict'

exports.defineAppEvent = function(name, desc, cat, arg) {
	
	var func = () => { AppEvent('defineAppEvent', { name, desc, arg, cat } ) }
	
	('App' in self && App.ready) ? func() : self.on('appReady', e => func())
}

exports.defineKeyShortcut = function(key, desc, cat) {
	
	var func = () => { AppEvent('defineKeyShortcut', { key, desc, cat } ) }
	
	('App' in self && App.ready) ? func() : self.on('appReady', e => func())
}

exports.AppEvent = function(name, detail) {
	var e = new Event(name)
	
	e.detail = e.d = detail
	
	App.ready ? self.dispatchEvent(e) : self.on('appReady', () => self.dispatchEvent(e))
}
