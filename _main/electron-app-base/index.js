var electron = require('electron')
var app = electron.app

module.exports = class {
  constructor(options) {
    if(options.constructor == String) {
      options = { index: 'file://' + options }
    }
    this.options = options
    
    app.on('window-all-closed', e => { app.quit() })
    app.on('ready', e => { this.ready() })
  }
  
  ready() {
    require('./menu')
    this.window()
  }
  
  window() {
    this.win = new electron.BrowserWindow({
      title: app.getName(),
      width:    43 * 16,    height: 31 * 16,
      minWidth: 31 * 16, minHeight: 31 * 16,
      useContentSize: true, autoHideMenuBar: true,
      backgroundColor: '#ececec',
    })
    this.wc = this.win.webContents
    
    this.wc.on('did-finish-load', e => { this.wc.isDevToolsOpened() && this.emit('developerMode') })
    this.wc.on('devtools-opened', e => { this.emit('developerMode') })
    this.wc.on('will-navigate', this.handleExternal.bind(this))
    this.wc.on('new-window', this.handleExternal.bind(this))
    
    this.win.loadURL(this.options.index)
    
    process.on('uncaughtException', e => { this.emit('error', { message: e.message }) })
    process.on('unhandledRejection', e => { throw(e) })
  }
  
  emit(name, detail) {
    this.wc.executeJavaScript(`self.emit && self.emit(${JSON.stringify(name)}, ${JSON.stringify(detail)})`)
  }
  
  handleExternal(e, url) {
    if(url != this.wc.getURL()) {
      e.preventDefault()
      electron.shell.openExternal(url)
    }
  }
}
