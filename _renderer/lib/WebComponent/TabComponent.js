'use strict'


module.exports = class TabComponent extends WebComponentAbstract {
	tabInit(name, cont) {
		cont = cont || this
		this.tab = { name, cont, current: 0 }
		
		defineAppEvent(`new${name}`, `Create new ${name}`, name, "{ instance: <HTMLElement>, title: '', priority: <Number> }")
		self.on(`new${name}`, e => this.newTab(e.d))
		
		defineAppEvent(`toggle${name}`, `Toggle ${name}`, name, "<Number> or <HTMLElement>")
		self.on(`toggle${name}`, e => this.toggle(e.d))
		
		defineAppEvent(`toggle${name}`, `${name} is active`, name)
		defineAppEvent(`blur${name}`, `${name} is hidden`, name)
	}
	
	newTab(tab) {
		if(!('priority' in tab)) tab.priority = 0
		
		var t = this.newElement('tab', false, { textContent: tab.title, instance: tab.instance, priority: tab.priority })
		t.setAttribute('name', tab.title)
		t.on('click', e => this.toggle(tab.instance))
		
		this.tab.cont.children.some(el => {
			if(t.priority < el.priority) { this.tab.cont.insertBefore(t, el); return true; }
		}) || this.tab.cont.appendChild(t)
		
		this.toggle(this.tab.current)
	}
	
	toggle(arg) {
		if(!isNaN(arg) && arg >= this.tab.cont.children.length) return
		
		this.tab.current = arg
		this.tab.cont.children.forEach((el, i) => {
			var show = !isNaN(arg) ? arg == i : arg == el.instance
			
			show ? el.classList.add('active') : el.classList.remove('active')
			el.instance.style.display = show ? null : 'none'
			
			el.instance.dispatchEvent(new Event(`${show ? 'focus' : 'blur'}${this.tab.name}`))
		})
	}
}
