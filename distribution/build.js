'use strict'

process.chdir(__dirname + '/..')
var json = require(__dirname + '/../package.json')

var opt = {
  'dir': '.', 'out': 'distribution',
  'overwrite': true,
  'ignore': [
    '^(?!$|/_main|/_renderer|/node_modules|/package.json$)',
    '/\\.[^/]*'
  ],
  
  'arch': 'x64', 'platform': 'win32,darwin',
  'asar': true, 'prune': true,
  
  'icon': 'resources/icon',
  
  'app-bundle-id': json.companyName.replace(/\..+/, '') + '.' + json.name,
  'app-version': json.version,
  'app-category-type': 'public.app-category.utilities',
  'app-copyright': '',
  
  'version-string': {
    'CompanyName': json.companyName,
    'ProductName': json.productName,
    'FileDescription': json.description.replace(/ /g, ' '),
    'InternalName': '',
    'OriginalFilename': '',
  },
}

require('electron-packager')(opt, e => console.log(e ? e : 'done'))
