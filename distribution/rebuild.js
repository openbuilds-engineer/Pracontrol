process.chdir(__dirname + '/..')

var filepath = require('path')
var execSync = require('child_process').execSync
var fs = require('fs-promise')

// remove previous build
var serialportRoot = filepath.dirname(require.resolve('serialport')) + '/..'
fs.removeSync(serialportRoot + '/build')

// rebuild serialport
var cmd = ''
if(process.platform == 'darwin') cmd = 'node_modules/.bin/'
cmd += 'electron-rebuild -w serialport -m . -f -v ' + execSync('npm view electron-prebuilt version')

execSync(cmd, { stdio: 'inherit' })
