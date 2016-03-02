var package = require('../package.json')
var app = require('electron').app
var Menu = require('menu')

var template = [
	{
		label: 'Edit',
		submenu: [
			{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
			{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
			{ type: 'separator' },
			{ label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
			{ label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
			{ label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
			{ label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' },
		]
	},
	{
		label: 'View',
		submenu: [
			{ label: 'Reload', accelerator: 'CmdOrCtrl+R', click: (item, focusedWin) => focusedWin && focusedWin.reload() },
			{ label: 'Toggle Full Screen', accelerator: `${process.platform == 'darwin' ? 'Ctrl+Command+F' : 'F11'}`,
				click: (item, focusedWin) => focusedWin && focusedWin.setFullScreen(!focusedWin.isFullScreen()) },
			{ label: 'Toggle Developer Tools', accelerator: `${process.platform == 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I'}`,
				click: (item, focusedWin) => focusedWin && focusedWin.toggleDevTools() },
		]
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{ label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
			{ label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: [
			{ label: 'Website', click: item => require('electron').shell.openExternal(package.homepage) },
			{ label: 'GitHub', click: item => require('electron').shell.openExternal(package.repository.url) },
		]
	},
]

if (process.platform == 'darwin') {
	var name = app.getName()
	
	template.unshift({
		label: name,
		submenu: [
			{ label: 'About ' + name, role: 'about' },
			{ type: 'separator'	},
			{ label: 'Services', role: 'services', submenu: [] },
			{ type: 'separator' },
			{ label: 'Hide ' + name, accelerator: 'Command+H', role: 'hide' },
			{ label: 'Hide Others', accelerator: 'Command+Alt+H', role: 'hideothers' },
			{ label: 'Show All', role: 'unhide' },
			{ type: 'separator' },
			{ label: 'Quit', accelerator: 'Command+Q', click: item => app.quit() },
		]
	})
	
	// Window menu
	template[3].submenu.push(
		{ type: 'separator' },
		{ label: 'Bring All to Front', role: 'front' }
	)
}

var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
