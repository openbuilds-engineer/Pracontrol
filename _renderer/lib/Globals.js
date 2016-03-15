'use strict'

exports.defineAppEvent = (name, desc, cat, arg) => AppEvent('defineAppEvent', { name, desc, arg, cat } )
exports.defineKeyShortcut = (key, desc, cat) => AppEvent('defineKeyShortcut', { key, desc, cat } )
exports.AppEvent = function(name, detail) {
	var e = new Event(name)
	e.detail = e.d = detail
	App.ready ? self.dispatchEvent(e) : self.on('appReady', () => self.dispatchEvent(e))
}
