'use strict'


module.exports = class TabComponent extends WebComponentAbstract {
	tabInit(name) {
		this.tabName = name
		
		defineAppEvent(`new${name}`, `Create new ${name}`, name, "{ instance: <HTMLElement>, title: '', priority: <Number> }")
		self.on(`new${name}`, e => this.newTab(e.d))
		
		defineAppEvent(`toggle${name}`, `Toggle ${name}`, name, "<Number> or <HTMLElement>")
		self.on(`toggle${name}`, e => this.toggle(e.d))
		
		defineAppEvent(`toggle${name}`, `${name} is active`, name)
		defineAppEvent(`blur${name}`, `${name} is hidden`, name)
		
		this.currentTab = 0
	}
	
	newTab(tab) {
		if(!('priority' in tab)) tab.priority = 0
		
		var t = this.newElement('tab', false, { textContent: tab.title, instance: tab.instance, priority: tab.priority })
		t.setAttribute('name', tab.title)
		t.on('click', e => this.toggle(tab.instance))
		
		this.children.some(el => {
			if(t.priority < el.priority) { this.insertBefore(t, el); return true; }
		}) || this.appendChild(t)
		
		this.toggle(this.currentTab)
	}
	
	toggle(arg) {
		if(!isNaN(arg) && arg >= this.children.length) return
		
		this.currentTab = arg
		this.children.forEach((el, i) => {
			var show = !isNaN(arg) ? arg == i : arg == el.instance
			
			show ? el.classList.add('active') : el.classList.remove('active')
			el.instance.style.display = show ? null : 'none'
			
			el.instance.dispatchEvent(new Event(`${show ? 'focus' : 'blur'}${this.tabName}`))
		})
	}
}
