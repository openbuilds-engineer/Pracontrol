'use strict'

var style = `
@import (reference) '../css/style.less';

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
	}
	
	balance() {
		if(this.isBalanced) return
		
		requestAnimationFrame(t => {
			
			this.querySelectorAll(':scope > flex_balancer').forEach(e => e.removeElement())
			
			for(let i = 0; i < 10; i++) this.newElement("flex_balancer")
			
			this.isBalanced = false
		})
		
		this.isBalanced = true
	}
}
