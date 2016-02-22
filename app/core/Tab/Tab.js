'use strict'

var style = `
:host {
	order: -100;
	flex-grow: 1;
	display: flex;
	flex-wrap: wrap;
	
	background-color: #333;
}

::content {
	
	> tab {
		padding: 0.5rem;
		color: #fff;
		cursor: pointer;
		font-size: 0.85em;
		
		&.active, &:hover { background-color: #666; }
		
		&[name='PraControl'] {
			background-image: url('img/logo.svg');
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 75% 75%;
			font-size: 0;
			width: 1rem;
		}
	}
}
`

module.exports = class Tab extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		defineAppEvent("newTab", "Create new tab", "Tabs", "{ instance: <HTMLElement>, title: '', priority: <Number> }")
		self.on('newTab', e => this.newTab(e.d))
		
		defineAppEvent("tabToggle", "Toggle tab", "Tabs", "<Number> or <HTMLElement>")
		self.on('tabToggle', e => this.toggle(e.d))
		
		defineAppEvent("tabFocus", "Tab is active", "Tabs")
		defineAppEvent("tabBlur", "Tab is hidden", "Tabs")
		
		defineKeyShortcut('⌘1‑9', 'Go to tab 1‑9', "Tabs")
		self.on('keydown', e => (e.metaKey || e.ctrlKey) && this.tabNumberShortcut(e))
		
		this.currentTab = 0
	}
	
	readyCallback() {
		new AppEvent('newPanel', { instance: this, position: 'top' })
	}
	
	newTab(tab) {
		if(!('priority' in tab)) tab.priority = 0
		
		var t = this.newElement('tab', false)
		t.setAttribute('name', tab.title)
		t.textContent = tab.title
		t.instance = tab.instance
		t.priority = tab.priority
		t.on('click', e => this.toggle(tab.instance))
		
		var inserted = this.children.some(el => {
			if(t.priority < el.priority) { this.insertBefore(t, el); return true; }
		})
		if(!inserted) this.appendChild(t)
		
		new AppEvent('newPanel', { instance: tab.instance })
		
		this.toggle(this.currentTab)
	}
	
	tabNumberShortcut(e) {
		if(e.keyCode < 49 || e.keyCode > 57) return
		this.toggle(e.keyCode - 49)
	}
	
	toggle(arg) {
		if(!isNaN(arg) && arg >= this.children.length) return
		
		this.currentTab = arg
		this.children.forEach((el, i) => {
			var show = !isNaN(arg) ? arg == i : arg == el.instance
			
			show ? el.classList.add('active') : el.classList.remove('active')
			el.instance.style.display = show ? null : 'none'
			
			el.instance.dispatchEvent(new Event(`tab${show ? 'Focus' : 'Blur'}`))
		})
	}
}
