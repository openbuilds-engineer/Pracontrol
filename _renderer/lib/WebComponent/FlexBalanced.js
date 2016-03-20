'use strict'

var style = `
@import (reference) '../../css/style.less';

:host {
	.column-system(@selector: ~"::content > *")
}

::content {
	> * {
		.column-width-grid;
	}
}
`

module.exports = class FlexBalanced extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style, { filename: __filename })
		
		new MutationObserver(e => this.changed(e)).observe(this, { childList: true })
	}
	
	changed(mut) {
		if(mut[0].addedNodes || mut[0].removedNodes) this.balance()
	}
	
	balance() {
		if(this.isBalanced) return
		
		requestAnimationFrame(t => {
			
			this.querySelectorAll(':scope > flex_balancer').forEach(e => e.removeNode())
			
			for(let i = 0; i < 10; i++) this.newElement("flex_balancer")
			
			this.isBalanced = false
		})
		
		this.isBalanced = true
	}
}
