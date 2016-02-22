'use strict'

var style = `
:host {
	display: block;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}

::content {
	
}
`
var info = `
<h1>Globals</h1>
<p>'App' variable is pointer to &lt;app-pracontrol&gt; with extra props:</p>
<ol>
	<li>.ready</li>
	<li>.package</li>
</ol>

<p>More functions are defined in:</p>
<ol>
	<li>lib/DOMProto</li>
	<li>lib/Define</li>
</ol>

<p>And global classes are defined in:</p>
<ol>
	<li>lib/WebComponentAbstract</li>
	<li>lib/FlexBalanced</li>
	<li>lib/AppEvent</li>
</ol>
`

module.exports = class Developer extends WebComponentAbstract {
	
	initCallback() {
		this.opened = false
		
		defineAppEvent('developerMode', 'Turns on developer mode and this page', 'Developer')
		self.on('developerMode', e => !this.opened && this.turnOn())
		
		this.newElement('div').innerHTML = info
		this.newElement(require('./AppEventTable.js'))
	}
	
	turnOn() {
		this.opened = true
		
		this.renderCss(style)
		
		new AppEvent('newTab', { instance: this, title: 'Developer', priority: 900 })
		
		defineKeyShortcut('⌥', 'Toogle baseline grid', "Developer")
		document.on("keydown", e => e.keyCode == 18 && document.body.classList.toggle('alt_key'))
		document.on("keyup", e => e.keyCode == 18 && document.body.classList.toggle('alt_key'))
		document.body.newElement('baseline_grid')
	}
}
