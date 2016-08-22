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
    elem.forEach(e => setImmediate(() => this.new(require(e + '/' + e), {}, false)))
  }
  
  appReady() {
    // event: window emits 'appReady' app is loaded
    setImmediate(() => self.emit('appReady'))
    
    // show when loaded
    this.style.display = ''
  }
}

document.body.new(PraControl)
