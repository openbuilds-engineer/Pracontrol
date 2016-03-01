'use strict'

var fs = require('fs')
var path = require('path')

var style = `
:host {
	
}
::content textarea { height: 14rem; }
::content li { margin-bottom: 1rem; }
`

module.exports = class Module extends WebComponentAbstract {
	initCallback() {
		this.defaultConf()
		this.loadModules()
		
		this.renderCss(style)
		
		this.el = this.newElement('class')
		this.el.classList.add('column-system')
		this.left = this.el.newElement('div')
		this.right = this.el.newElement('div')
		
		this.left.newElement('h1').textContent = 'Module list'
		this.left.newElement('p').innerHTML = 'Edit module list as you want.<br>Be careful load only trusted modules!'
		this.textarea = this.left.newElement('p').newElement('textarea')
		this.textarea.value = this.ser.conf
		this.textarea.on('input', e => this.ser.conf = this.textarea.value)
		this.left.newElement('p').innerHTML = `<p><a onclick="location.reload()" class="button">Reload to take effect</a></p>`
		
		var exampleFile = require.resolve('Example')
		this.right.newElement('h1').textContent = 'Modules development'
		this.right.newElement('div').innerHTML = `
<ol>
	<li><a onclick="require('electron').shell.showItemInFolder('${exampleFile}')" class="button">Take Example.js</a></li>
	<li>Put some code in it</li>
	<li><a onclick="AppEvent('newModule', 'Example')" class="button">Add it to the module list</a></li>
	<li>Reload app</li>
	<li><a onclick="require('remote').getCurrentWindow().toggleDevTools()" class="button">Toogle developer tools for debug</a></li>
	<li><a href="${App.package.pullRequest}" class="button">Make a pull request</a></li>
	<li>Spread the word!</li>
</ol>
		`
		
		defineAppEvent('newModule', 'Adds new module to module list', 'Modules', "''")
		self.on('newModule', e => (this.textarea.value += "\n" + e.d) && this.textarea.dispatchEvent(new Event('input')))
	}
	
	defaultConf() {
		if(!('conf' in this.ser)) {
			this.ser.conf = [
				'ControlShortcuts',
				'RemoteControl',
				'Fan',
			].join("\n")
		}
	}
	
	loadModules() {
		this.ser.conf.split("\n").forEach(s => {
			if(!s) return
			try { App.newElement(require(s), false) } catch(e) { AppEvent('error', e) }
		})
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, title: 'Modules', priority: 850 })
	}
}
