'use strict'

// Rebuild native modules
//
// 1) run first under Win machine
//      electron-prebuild and electron-rebuild must install globally
// 2) then under Mac machine
//

var fs = require('fs')
var path = require('path')
var child_process = require('child_process')

// change dir
process.chdir(path.join(__dirname, '..'))

if(process.platform == "win32") {
	
	// update packages
	child_process.execSync('npm update -g electron-prebuilt', { stdio: [0, 1, 2] })
	child_process.execSync('npm update -g electron-rebuild', { stdio: [0, 1, 2] })
	
	// rebuild
	child_process.execSync('electron-rebuild -w serialport -m .', { stdio: [0, 1, 2] })
	
	// correct naming
	var bin = path.join(path.dirname(require.resolve('serialport')), 'build', 'Release')
	var getDirectories = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
	
	getDirectories(bin).forEach(p => {
		if(!p.match(/^electron-/)) return
		var o = path.join(bin, p)
		var n = path.join(bin, p.replace(/electron-[^-]+/, `node-v${process.versions.modules}`))
		fs.renameSync(o, n)
	})
	
} else if(process.platform == "darwin") {
	
	// rebuild
	process.chdir(path.dirname(require.resolve('serialport')))
	child_process.execSync('npm run install')
}
