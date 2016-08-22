global.defineEvent = (name, desc, cat, arg) => setImmediate(() => self.emit('defineEvent', { name, desc, arg, cat }))
global.defineShortcut = (key, desc, cat) => setImmediate(() => self.emit('defineShortcut', { key, desc, cat }))

class PraControl extends require('web-component-app') {
  init() {
    // app pointer
    global.app = this
    
    // hide before before full load
    this.style.display = 'none'
    
    // package info
    this.package = require('../package.json')
    
    // error reporting here
    this.new(require('UI/UI'), {}, false)
    
    // load modules
    var modules = [
      'Panel', 'Tab', 'Serial', 'Printer',
      'About', 'Control', 'Console',
      'Developer', 'KeyShortcutsTable', 'Module',
      'ControlShortcuts', 'RemoteControl', '25D Slicer',
    ]
    modules.forEach(e => setImmediate(() => this.new(require(e + '/' + e), {}, false)))
    
    // render css then load content
    this.lessOpt = { paths: [require('rembased'), __dirname + '/res'] }
    this.renderLess(__dirname + '/resources/style.less', { global: true }).then(e => this.appReady())
  }
  
  appReady() {
    // event: window emits 'appReady' app is loaded
    setImmediate(() => self.emit('appReady'))
    
    // show when loaded
    this.style.display = ''
  }
}

document.body.new(PraControl)
