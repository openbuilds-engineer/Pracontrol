// please
NodeList.prototype.forEach = HTMLCollection.prototype.forEach = FileList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.map = HTMLCollection.prototype.map = FileList.prototype.map = Array.prototype.map
NodeList.prototype.some = HTMLCollection.prototype.some = FileList.prototype.some = Array.prototype.some
NodeList.prototype.every = HTMLCollection.prototype.every = FileList.prototype.every = Array.prototype.every

Node.prototype.prepend = function(node) { this.firstChild ? this.insertBefore(node, this.firstChild) : this.appendChild(node) }
Node.prototype.append = Node.prototype.appendChild

Node.prototype.before = function(node) { return this.parentNode.insertBefore(node, this) }
Node.prototype.after = function(node) { return this.parentNode.insertBefore(node, this.nextSibling) }

// events
EventTarget.prototype.on = function() { return this.addEventListener.apply(this, arguments) }
EventTarget.prototype.emit = function(name, arg) { setImmediate(() => { var e = new Event(name); e.detail = arg; this.dispatchEvent(e); }) }

// new
Node.prototype.new = function(element, prop = {}, append = true) {
  var el, name
  
  // new from string
  if(element.constructor == String) {
    if(element[0] == '-') element = 'app' + element
    el = document.createElement(element)
  }
  
  // new from class
  else if(element instanceof Object) {
    var name = `app-${element.name || name}`
    el = document.createElement(name)
    
    if(el.constructor === HTMLElement) document.registerElement(name, element)
  }
  
  if(!el) return
  
  Object.assign(el, prop)
  
  if(append) this.append(el)
  
  el.init && el.init()
  
  return el
}

// newText
Node.prototype.newText = function(text, prop = {}, append = true) {
  var el = document.createTextNode(text)
  Object.assign(el, prop)
  if(append) this.append(el)
  return el
}
