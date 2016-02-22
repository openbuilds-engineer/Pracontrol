'use strict'

var style = `
:host {
  
}

::content {
  button {
    display: block;
    height: 100%;
    width: 100%;
  }
}
`

module.exports = class NameOfYourModule extends WebComponentAbstract {
  initCallback() {
    // work here
    // do not dispatch events here
    this.renderLess(style)
    
    this.but = this.newElement('button')
    this.but.textContent = "Emergency stop"
    this.but.on('click', e => new AppEvent('serialWrite', { data: 'M999', prepend: true }))
  }
  
  readyCallback() {
    // app is ready
    // fire events here
    
    // in this case we are going for new tab
    new AppEvent('newTab', { instance: this, 'title': 'Example' })
  }
  
  attachedCallback() {
    // additional work
    // fired after element is attached to DOM
    
  }
}
