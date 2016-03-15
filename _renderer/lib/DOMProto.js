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

// remove node
Node.prototype.removeNode = function() { this.parentNode.removeChild(this) }

// insertAfter
Node.prototype.insertAfter = function(n, t) {
	var p = t.parentNode
	return p.lastchild == t ? p.appendChild(n) : p.insertBefore(n, t.nextSibling)
}



// append new text node
Node.prototype.newText = function(t) { return this.appendChild(document.createTextNode(t)) }

// creates new element and attach it by default
Node.prototype.newElement = function(element, attach, prop) {
	if(attach === undefined) attach = true
	
	var el, name
	
	// new from string
	if(element.constructor == String) {
		if(element.includes('-')) { name = element; element = class extends WebComponentAbstract {}; }
		else el = document.createElement(element)
	}
	
	// new from class
	if(element instanceof Object) {
		var name = `app-${element.name || name}`
		el = document.createElement(name)
		
		if(el.constructor === HTMLElement) document.registerElement(name, element)
	}
	
	if(!el) return
	
	Object.assign(el, prop)
	
	return attach ? this.appendChild(el) : el
}
