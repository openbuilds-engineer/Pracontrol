module.exports = class TabComponent extends WebComponentAbstract {
  initTab(container) {
    // event: element emits 'tabFocus' when tab is active
    // event: element emits 'tabBlur' when tab is hidden
    
    this.tab = { container: container || this, active: 0 }
  }
  
  newTab(opt) {
    var opt = { textContent: opt.name, name: opt.name, el: opt.el, priority: opt.priority || 0 }
    
    var tab = this.new('tab', opt, false)
    tab.setAttribute('name', tab.name)
    tab.on('click', e => this.focusTab(tab.el))
    tab.style.cursor = 'pointer'
    
    this.tab.container.children.some(el => {
      if(tab.priority < el.priority) { el.before(tab); return true; }
    }) || this.tab.container.append(tab)
    
    if(this.willFocus) clearImmediate(this.willFocus)
    this.willFocus = setImmediate(() => this.focusTab(opt.focus ? opt.el : this.tab.active))
    
    return tab
  }
  
  removeTab(arg) {
    this.testTab(arg, (tab, i, pass) => {
      if(pass) {
        tab.remove()
        tab.el.remove()
      }
    })
    this.focusTab()
  }
  
  focusTab(arg = 0) {
    this.willFocus = null
    this.testTab(arg, (tab, i, pass) => {
      if(pass) {
        if(!tab.classList.contains('active')) {
          tab.classList.add('active')
          tab.classList.remove('disable')
          if(tab.el) {
            tab.el.style.display = null
            tab.el.emit('tabFocus')
            this.tab.active = tab.el
          }
        }
      }
      else {
        if(!tab.classList.contains('disable')) {
          tab.classList.remove('active')
          tab.classList.add('disable')
          if(tab.el) {
            tab.el.style.display = 'none'
            tab.el.emit('tabBlur')
          }
        }
      }
    })
  }
  
  testTab(arg, func) {
    if(arg === undefined) arg = this.tab.active
    
    var testFunc
    
    if(arg.constructor == Number) {
      if(arg >= this.tab.container.children.length) return
      testFunc = (el, i) => arg == i
    }
    else if(arg.constructor == String) {
      testFunc = (el, i) => arg == el.name
    }
    else if(arg instanceof Object) {
      testFunc = (el, i) => arg == el.el
    } else {
      return
    }
    
    var childs = this.tab.container.children
    childs.forEach((tab, i) => func(tab, i, testFunc(tab, i)))
  }
}
