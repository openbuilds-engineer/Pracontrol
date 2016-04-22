'use strict'

// Rebuild serialport for Electron

var path = require('path')
var child_process = require('child_process')
var serialportRoot = path.dirname(require.resolve('serialport'))

// change work dir
process.chdir(path.join(__dirname, '..'))

// make sure that everything is installed
child_process.execSync('npm i', { stdio: 'inherit' })

if(process.platform == 'win32') {
  // delete current serialport build
  child_process.execSync(`rmdir "${path.join(serialportRoot, '/build')}" /s /q`, { stdio: 'inherit' })
  
  // rebuild serialport
  child_process.execSync('electron-rebuild -w serialport -m . -f', { stdio: 'inherit' })
}
else if(process.platform == 'darwin') {
  // delete current serialport build
  child_process.execSync(`rm -r "${path.join(serialportRoot, '/build')}"`, { stdio: 'inherit' })
  
  // rebuild serialport
  process.chdir(serialportRoot)
  child_process.execSync('npm run install')
}
