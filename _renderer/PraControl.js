'use strict'

class PraControl extends require('web-component-app') {
  initCallback() {
    // package info
    this.package = require('../package.json')
    
    // core modules
    this.core = [
      'Panel', 'Tab', 'Serial', 'Printer',
      'About', 'Control', 'Console',
      'Developer', 'KeyShortcutsTable', 'Module',
      'ControlShortcuts', 'RemoteControl', '25D Slicer',
    ]
    
    // error reporting here, must load first
    this.newElem(require('UI/UI'), false)
    
    // render css then load content
    this.lessOpt = { paths: [require('rembased'), __dirname + '/res'] }
    this.renderLess(__dirname + '/res/style.less', { global: true }).then(e => this.appMain())
  }
}

global.App = document.body.newElem(PraControl)
