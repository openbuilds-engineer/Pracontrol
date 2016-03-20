'use strict'

var base = require('electron-app-base')

var index = 'file:///' + require('path').join(__dirname, '../_renderer/index.html')
new base(index)
