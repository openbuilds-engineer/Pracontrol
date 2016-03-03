'use strict'

var path = require('path')

process.chdir(path.join(__dirname, '..'))

var pjson = require(path.join(__dirname, '../package.json'))

require('electron-packager')(pjson.electronPackagerOpts, e => console.log(e ? e : 'done'))
