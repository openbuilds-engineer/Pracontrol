process.chdir(__dirname + '/..')

var json = require(__dirname + '/../package.json')

var opt = {
  'dir': '.', 'out': 'distribution',
  'overwrite': true,
  'ignore': [
    '^(?!$|/_main|/_renderer|/node_modules|/package.json$)',
    '/\\.[^/]*'
  ],
  
  'arch': 'x64',
  'platform': process.argv[2] || 'win32,darwin',
  'asar': true,
  
  'icon': 'resources/icon',
  
  'appBundleId': json.companyName.replace(/\..+/, '') + '.' + json.name,
  'appVersion': json.version,
  'appCategoryType': 'public.app-category.utilities',
  'appCopyright': '',
  
  'win32metadata': {
    'CompanyName': json.companyName,
    'ProductName': json.productName,
    'FileDescription': json.description.replace(/ /g, ' '),
    'InternalName': '',
    'OriginalFilename': '',
    'LegalCopyright': '',
  },
}

require('electron-packager')(opt, e => console.log(e ? e : 'done'))
