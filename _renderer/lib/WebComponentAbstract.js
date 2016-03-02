'use strict'

var less = null // load later if needed
var fs = require('fs')
var md5 = s => require('crypto').createHash('md5').update(s).digest('hex')

module.exports = class WebComponentAbstract extends HTMLElement {
	createdCallback() {
		// create shadow dom
		this.createShadowRoot().newElement('content')
		
		// readyCallback
		self.on('appReady', e => this.readyCallback && this.readyCallback())
		
		// deserialize
		this.deserialize()
		
		// serialize
		self.on('beforeunload', e => this.serialize())
		
		// initCallback
		this.initCallback && this.initCallback()
	}
	
	serialize() {
		if(!Object.keys(this.ser).length) return
		self.localStorage.setItem(this.localStorageKey, JSON.stringify(this.ser))
	}
	
	deserialize() {
		this.localStorageKey = `serializedData-${this.localName}`
		var data = self.localStorage.getItem(this.localStorageKey)
		this.ser = data && JSON.parse(data) || {}
	}
	
	renderCss(css, global) {
		(global ? document.body : this.shadowRoot).newElement('style').textContent = css
	}
	
	renderLess(style, opt, global) {
		if(!style) return
		
		var cacheName = `renderLessCache-${md5(style)}`
		var cache = self.localStorage.getItem(cacheName)
		
		if(cache) return this.renderCss(cache, global)
		
		if(!less) less = require('less')
		
		var l = less.render(style, opt)
		l.then(o => {
			this.renderCss(o.css, global)
			self.localStorage.setItem(cacheName, o.css)
		})
		return l
	}
	
	renderLessFile(path, global) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, { encoding: 'utf-8' }, (e, data) => {
				e ? reject(e) : resolve( this.renderLess(data, { filename: path }, global) )
			})
		})
	}
}
