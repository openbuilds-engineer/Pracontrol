'use strict'

class PraControl extends require('web-component-app') {
  initCallback() {
    // package info
    this.package = require('../package.json')
    
    // error reporting here, must load first
    this.newElem(require('UI/UI'), false)
    
    // load core modules
    this.loadModules()
    
    // render css then load content
    this.lessOpt = { paths: [require('rembased'), __dirname + '/res'] }
    this.renderLess(__dirname + '/res/style.less', { global: true }).then(e => this.appReady())
  }
  
  loadModules() {
    var elem = [
      'Panel', 'Tab', 'Serial', 'Printer',
      'About', 'Control', 'Console',
      'Developer', 'KeyShortcutsTable', 'Module',
      'ControlShortcuts', 'RemoteControl', '25D Slicer',
    ]
    elem.forEach(e => setImmediate(() => this.newElem(require(e + '/' + e), false)))
  }
}

global.App = document.body.newElem(PraControl)
