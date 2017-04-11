var fs = require('fs')
var less = null // lazy-load
var md5 = s => require('crypto-js/md5')(s)
var app = null

module.exports = class WebComponentAbstract extends HTMLElement {
  createdCallback() {
    if(!app) app = this
    
    // create shadow dom
    this.createShadowRoot().new('content')
    
    // serialize & deserialize
    this.deserialize()
    self.on('beforeunload', e => this.serialize())
  }
  
  serialize() {
    if(!Object.keys(this.ser).length) return
    var filter = (key, value) => value instanceof HTMLElement ? null : value
    var json = JSON.stringify(this.ser, filter, ' ')
    self.localStorage.setItem(this.localStorageKey, json)
    return json
  }
  
  deserialize() {
    this.localStorageKey = `serializedData-${this.localName}`
    var data = self.localStorage.getItem(this.localStorageKey)
    this.ser = data && JSON.parse(data) || {}
  }
  
  renderCss(css, global) {
    (global ? document.body : this.shadowRoot).new('style').textContent = css
  }
  
  renderLess(style, opt = {}) {
    if(style.endsWith('.less')) return new Promise((resolve, reject) => {
      fs.readFile(style, { encoding: 'utf-8' }, (e, data) => {
        e ? reject(e) : resolve( this.renderLess(data, opt) )
      })
    })
    
    var cacheName = `renderLessCache-${app.package ? app.package.version : 0}-${md5(style)}`
    var cache = self.localStorage.getItem(cacheName)
    
    if(cache) return this.renderCss(cache, opt.global)
    
    if(!less) less = require('less')
    
    opt.compress = true
    Object.assign(opt, app.lessOpt)
    
    var l = less.render(style, opt)
    l.then(o => {
      this.renderCss(o.css, opt.global)
      self.localStorage.setItem(cacheName, o.css)
    })
    return l
  }
}
