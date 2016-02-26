'use strict'

exports.defineAppEvent = function(name, desc, cat, arg) {
	
	var func = () => { new AppEvent('defineAppEvent', { name, desc, arg, cat } ) }
	
	('App' in self && App.ready) ? func() : self.on('appReady', e => func())
}

exports.defineKeyShortcut = function(key, desc, cat) {
	
	var func = () => { new AppEvent('defineKeyShortcut', { key, desc, cat } ) }
	
	('App' in self && App.ready) ? func() : self.on('appReady', e => func())
}

exports.AppEvent = function(name, detail) {
	var e = new Event(name)
	
	this.detail = detail
	this.d = this.detail // shorthand
	
	self.dispatchEvent(e)
}
