'use strict'

var style = `
:host {
	display: flex;
	width: 100%;
	height: 100%;
}

::content {
	.panel() {
		display: flex;
		background-color: #ECECEC;
		justify-content: space-between;
		z-index: 100;
	}
	
	> left, > right { .panel() }
	> middle { flex-grow: 1; }
	
	> middle {
		display: flex;
		flex-flow: column;
		
		> top, > bottom { .panel() }
		> main {
			flex-grow: 1;
			position: relative;
			> wrapper {
				position: absolute;
				left: 1rem; right: 1rem; top: 1rem; bottom: 1rem;
			}
		}
	}
}
`

module.exports = class Panel extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.left = this.newElement('left')
		this.middle = this.newElement('middle')
		this.right = this.newElement('right')
		
		this.top = this.middle.newElement('top')
		this.main = this.middle.newElement('main')
		this.wrapper = this.main.newElement('wrapper')
		this.bottom = this.middle.newElement('bottom')
		
		defineAppEvent("newPanel", "Create new panel", "Panel",
			"{ instance: <HTMLElement>, position: [left|top|right|bottom|main] }")
		self.on('newPanel', e => this.newPanel(e.d))
	}
	
	newPanel(d) {
		var el = this.wrapper
		switch(d.position) {
			case 'left': el = this.left; break
			case 'top': el = this.top; break
			case 'right': el = this.right; break
			case 'bottom': el = this.bottom; break
		}
		el.appendChild(d.instance)
	}
	
	readyCallback() {
		new AppEvent('newElement', { instance: this })
	}
}
