var path = require('path')
var child_process = require('child_process')
var serialportRoot = path.dirname(require.resolve('serialport')) + '/..'
process.chdir(__dirname + '/..')

// change work dir
process.chdir(path.join(__dirname, '..'))

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
  child_process.execSync('node_modules/.bin/electron-rebuild -w serialport -m . -f', { stdio: 'inherit' })
}
