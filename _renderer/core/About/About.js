'use strict'

var style = `
::host {
	
}

::content {
	> .column-system {
		height: 100%;
		align-items: center;
		> left { text-align: center; }
	}
	
	.logo {
		background: url('img/logo.svg') center center no-repeat;
		background-size: 90% 90%;
		display: block;
		height: 10rem;
		margin-bottom: 1rem;
	}
	
	p[update] { font-weight: 400 }
}
`

var html = `
<div class="column-system">

<left class="column-width-gold">
	<div class="logo"></div>
	<h1>${App.package.productName} <small>${App.package.version}</small></h1>
	<p>${App.package.description}</p>
	<p><a href="${App.package.homepage}">website</a> | <a href="${App.package.repository.url}">GitHub</a></p>
	<p update> </p>
</left>

<right>
	<h2>Feature request</h2>
	<p><a href="${App.package.featureRequest}">Write it down and put a bounty on it.</a></p>

	<h2>Contributors</h2>
	<p>${App.package.contributors.map(e => `<a href="${e.url || 'mailto://' + e.email}">${e.name}</a>`).join(", ")}</p>

	<p><a href="${App.package.donate}" class="button">Buy me a beer 🍺</a></p>

	<p><a onclick="AppEvent('toggleTab', 1)" class="button">Continue →</a></p>
</right>
	
</div>
`

module.exports = class About extends WebComponentAbstract {
	initCallback() {
		this.innerHTML = html
		this.renderLess(style)
		
		this.checkForUpdate()
	}
	
	checkForUpdate() {
		var url = 'https://raw.githubusercontent.com/Pravdomil/pra-control/master/package.json'
		
		require('request')(url, (e, res, body) => {
			if(e) return
			
			var ver = JSON.parse(body).version
			if(ver == App.package.version) return
			
			this.querySelector('p[update]').innerHTML = `<a href="${App.package.homepage}">New version ${ver} available!</a>`
		})
	}
	
	readyCallback() {
		AppEvent('newTab', { instance: this, title: 'PraControl', priority: -100 })
	}
}
