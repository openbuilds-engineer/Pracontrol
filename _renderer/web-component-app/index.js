'use strict'

// more basic prototypes
require('./src/Prototypes')

// more globals
global.WebComponentAbstract = require('./src/WebComponent/WebComponentAbstract')
global.FlexBalanced = require('./src/WebComponent/FlexBalanced')
global.TabComponent = require('./src/WebComponent/TabComponent')

// export class
module.exports = class extends WebComponentAbstract {
  
}

// Observe
function Observe(name, func) {
  if(!('_props' in this)) Object.defineProperty(this, '_props', { value: {} } )
  
  var first = !(name in this._props)
  var prop = first ? (this._props[name] = { value: this[name], listeners: [] }) : this._props[name]
  
  if(first) {
    var set = (val) => { prop.value = val; prop.listeners.forEach(f => f(val)); }
    var get = () => prop.value
    Object.defineProperty(this, name, { set, get })
  }
  
  prop.listeners.push(func)
  func(prop.value)
}

function Synth(key, target, targetKey = 'textContent') {
  if(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    targetKey = 'value'
    target.on('input', e => this[key] = target.value)
  }
  global.Observe(this, key, value => target[targetKey] = value)
  return target
}

global.Observe = (...args) => Observe.call(...args)
global.Synth = (...args) => Synth.call(...args)
