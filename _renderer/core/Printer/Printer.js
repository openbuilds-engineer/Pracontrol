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
		:host-context(.drag) & { background-color: WhiteSmoke; }
	}
}
`

module.exports = class Printer extends WebComponentAbstract {
	initCallback() {
		this.renderLess(style)
		
		this.drop = this.newElement('drop')
		this.drop.textContent = "Drop .gcode to print"
		
		self.on("newFile", e => this.newFile(e))
	}
	
	readyCallback() {
		AppEvent('newDashboard', { instance: this })
	}
	
	newFile(e) {
		e.d.forEach(file => {
			if(file.path.substr(-5) == "gcode") this.printFile(file.path)
		})
	}
	
	printFile(path) {
		fs.readFile(path, function(err, data) {
				if(err) throw err;
				
				var file = data.toString().split("\n");
				AppEvent('serialWrite', { data: file })
		})
	}
}