'use strict'

var fs = require('fs');

var style = `
:host {
	order: 200;
}

::content {
	drop {
		display: block;
		height: 12rem;
		width: 100%;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1px dashed LightGray;
		&.drag { background-color: WhiteSmoke; }
	}
}
`

module.exports = class Printer extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.drop = this.newElement('drop')
		this.drop.textContent = "Drop gCode file to print"
		
		this.drop.on("dragover", e => this.dragHover(e))
		this.drop.on("dragleave", e => this.dragEnd(e))
		this.drop.on("drop", e => this.fileDrop(e))
	}
	
	readyCallback() {
		new AppEvent('newDashboard', { instance: this })
	}
	
	dragHover(e) {
		this.drop.classList.add('drag')
		e.preventDefault()
	}
	
	dragEnd(e) {
		this.drop.classList.remove('drag')
		e.preventDefault()
	}
	
	fileDrop(e) {
		this.dragEnd(e)
		var file = e.dataTransfer.files && e.dataTransfer.files[0];
		this.printFile(file.path)
	}
	
	printFile(path) {
		fs.readFile(path, function(err, data) {
				if(err) throw err;
				
				var file = data.toString().split("\n");
				new AppEvent('serialWrite', { data: file })
		})
	}
}
