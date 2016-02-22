#!/usr/bin/env electron .

var app = require('app')
var path = require('path')
var shell = require('electron').shell
var BrowserWindow = require('browser-window')

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
	require('./app/menu')
	
	var index = 'file:///' + path.join(__dirname, 'app/index.html')
	
	var rem = 17
	this.win = new BrowserWindow({
		title: app.getName(),
		width: 41 * rem, height: 30 * rem,
		minWidth: 30 * rem, minHeight: 30 * rem,
		useContentSize: true,
	})
	
	this.win.webContents.on('will-navigate', (e, url) => {
		if(url == this.win.webContents.getURL()) return
		e.preventDefault()
		shell.openExternal(url)
	})
	
	this.win.webContents.on('did-finish-load', e => {
		if(this.win.webContents.isDevToolsOpened()) this.win.webContents.executeJavaScript(
			`self.on('appReady', e => new AppEvent('developerMode'))`)
	})
	this.win.webContents.on('devtools-opened', e => {
		this.win.webContents.executeJavaScript(`new AppEvent('developerMode')`)
	})
	
	this.win.loadURL(index)
})
