'use strict'

var style = `
:host {
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  height: 100%;
}

::content {
  textarea { height: 8rem; }
  canvas { width: 100%; border: 1px solid #ddd; box-sizing: border-box; image-rendering: pixelated; }
}
`

var path = require('path')

module.exports = class Slicer25D extends WebComponentAbstract {
  initCallback() {
    this.renderLess(style)
    
    var div = this.newElem('div', true, { className: 'column-system' })
    this.left = div.newElem('div')
    this.slicer = div.newElem(require('./lib/slicer.js'), true, { parent: this })
    this.slicer.style.flexGrow = 3
    
    this.left.newElem('h1').textContent = '2.5D Slicer'
    
    this.recent = this.left.newElem('p').newElem('select')
    this.recent.newElem('option', true, { textContent: 'Load recent files' })
    this.recent.on('input', e => this.slice())
    this.ser.recent = this.ser.recent || []
    this.ser.recent = this.ser.recent.slice(-5)
    this.ser.recent.forEach(p => this.newRecentOption(p))
    
    var l = this.left.newElem('p').newElem('label')
    var fidelityText = l.newText('')
    var opt = { type: "range", min: 1, max: 10, step: 0.05, value: this.ser.fidelity || 5 }
    l.newElem('br')
    this.fidelity = l.newElem('input', true, opt)
    this.fidelity.on('input', e => {
      this.ser.fidelity = this.fidelity.value
      fidelityText.textContent = `Fidelity ${ Math.round((72 / 256) / this.ser.fidelity * 1000) / 100 }` 
    })
    this.fidelity.dispatchEvent(new Event('input'))
    
    var l = this.left.newElem('p').newElem('label')
    var passText = l.newText('')
    var opt = { type: "range", min: 1, max: 100, step: 1, value: this.ser.pass || 1 }
    l.newElem('br')
    this.pass = l.newElem('input', true, opt)
    this.pass.on('input', e => {
      this.ser.pass = this.pass.value
      passText.textContent = `Passes ${this.ser.pass}` 
    })
    this.pass.dispatchEvent(new Event('input'))
    
    var l = this.left.newElem('p').newElem('label', true, { textContent: 'Controling gCode' })
    this.powerCmd = l.newElem('textarea')
    this.powerCmd.on('input', e => this.ser.powerCmd = this.powerCmd.value)
    this.powerCmd.value = this.ser.powerCmd || 'G0 X${x} Y${y} \\\nZ${s * -1 / 1000}'
    l.newElem('pre').textContent = 'var x, y, s, p'
    
    var l = this.left.newElem('p').newElem('label', true, { textContent: 'Slicing channel ' })
    this.channel = l.newElem('select')
    this.channel.newElem('option').textContent = 'Red'
    this.channel.newElem('option').textContent = 'Green'
    this.channel.newElem('option').textContent = 'Blue'
    this.channel.newElem('option').textContent = 'Alpha'
    this.channel.newElem('option').textContent = 'Grayscale'
    this.channel.on('input', e => this.ser.channel = this.channel.selectedIndex)
    this.ser.channel = isNaN(this.ser.channel) ? 4 : this.ser.channel
    this.channel.options[this.ser.channel].selected = true
    
    self.on("newFile", e => this.newFile(e))
  }
  
  newFile(e) {
    var p = e.d[0].path
    
    if(!['svg', 'bmp', 'png', 'jpg', 'gif'].includes(p.substr(-3))) return
    
    this.ser.recent.push(p)
    this.newRecentOption(p, true)
    this.slice()
  }
  
  newRecentOption(p, selected) {
    var opt = this.recent.newElem('option', false, { path: p, textContent: path.basename(p), selected })
    this.recent.insertAfter(opt, this.recent.children[0])
  }
  
  slice() {
    if(!this.recent.selectedOptions.length) return
    this.slicer.slice(this.recent.selectedOptions[0].path)
  }
  
  readyCallback() {
    AppEvent('newTab', { elem: this, name: "2.5D" })
    AppEvent('toggleTab', this)
  }
}
