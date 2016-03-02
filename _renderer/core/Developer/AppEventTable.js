'use strict'

module.exports = class AppEventTable extends WebComponentAbstract {
	
	initCallback() {
		defineAppEvent('defineAppEvent', 'Add new event to this table', "Developer", "{ name: '', desc: '', cat: '', arg: '' }")
		self.on('defineAppEvent', e => this.defineAppEvent(e.d))
		
		this.newElement('h1').textContent = 'App events'
		this.table = this.newElement('table')
	}
	
	defineAppEvent(e) {
		var tbody = this.querySelector(`tbody[cat='${e.cat}']`)
		
		if(!tbody) {
			var thead = this.table.newElement('thead')
			
			var tr = thead.newElement('tr')
			var th = tr.newElement('th')
			th.colSpan = 2
			th.textContent = e.cat
			
			tbody = this.table.insertAfter(this.newElement('tbody', false), thead)
			tbody.setAttribute('cat', e.cat)
		}
		
		var tr = tbody.newElement('tr')
		tr.newElement('td').textContent = e.name
		tr.newElement('td').textContent = e.desc
		tr.newElement('td').textContent = e.arg
	}
}
