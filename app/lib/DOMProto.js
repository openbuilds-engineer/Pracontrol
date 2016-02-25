'use strict'

// please
NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.some = Array.prototype.some
NodeList.prototype.every = Array.prototype.every
HTMLCollection.prototype.forEach = Array.prototype.forEach
HTMLCollection.prototype.some = Array.prototype.some
HTMLCollection.prototype.every = Array.prototype.every
FileList.prototype.forEach = Array.prototype.forEach

// shorthand
EventTarget.prototype.on = function() { return this.addEventListener.apply(this, arguments) }

// remove element
Node.prototype.removeElement = function() { this.parentNode.removeChild(this) }

// insertAfter
Node.prototype.insertAfter = function(n, t) {
	var p = t.parentNode
	return p.lastchild == t ? p.appendChild(n) : p.insertBefore(n, t.nextSibling)
}



// append new text node
Node.prototype.newText = function(t) { return this.appendChild(document.createTextNode(t)) }

// creates new element and attach it by default
Node.prototype.newElement = function(element, attach) {
	if(attach == null) attach = true
	
	var el
	
	// new from string
	if(element.constructor == String) {
		if(element.includes('-')) {
			// http://stackoverflow.com/questions/35526110/creates-new-class-with-name-from-variable
			element = eval(`class ${element.replace('-', '')} extends WebComponentAbstract {}`)
		}
		else el = document.createElement(element)
	}
	
	// new from class
	if(element instanceof Object) {
		
		var name = ('App' in self && App.elemPrefix || 'app-') + element.name
		
		el = document.createElement(name)
		el.parent = this
		if(el.constructor === HTMLElement) document.registerElement(name, element)
	}
	
	if(!el) return
	
	return attach ? this.appendChild(el) : el
}
