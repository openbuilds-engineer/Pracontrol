var app = require('app')
var path = require('path')
var BrowserWindow = require('browser-window')

app.on('window-all-closed', app.quit)
app.on('ready', ready)

function ready() {
	require('./menu')
	
	var rem = 17
	var win = new BrowserWindow({
		title: app.getName(),
		width: 41 * rem, height: 30 * rem,
		minWidth: 30 * rem, minHeight: 30 * rem,
		useContentSize: true,
	})
	
	win.webContents.on('will-navigate', (e, url) => {
		if(url == win.webContents.getURL()) return
		e.preventDefault()
		require('electron').shell.openExternal(url)
	})
	
	var developerMode = e => win.webContents.executeJavaScript('AppEvent("developerMode")')
	win.webContents.on('did-finish-load', e => win.webContents.isDevToolsOpened() && developerMode() )
	win.webContents.on('devtools-opened', developerMode)
	
	win.loadURL('file:///' + path.join(__dirname, '../_renderer/index.html'))
}
