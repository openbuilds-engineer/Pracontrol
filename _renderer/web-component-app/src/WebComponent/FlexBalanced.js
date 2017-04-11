module.exports = class FlexBalanced extends WebComponentAbstract {
  init() {
    this.initFlexBalanced()
  }
  
  initFlexBalanced() {
    new MutationObserver(mut => this.changedFlexBalanced(mut)).observe(this, { childList: true })
    
    this.readyFlexBalanced()
  }
  
  readyFlexBalanced() {
    this.basis = this.basis || 10
    
    var style = `
    @import (reference) 'style';
    :host { .column-system(@selector: ~'::content > *') }
    :host ::content > * { flex-basis: ${this.basis}rem; }
    `
    this.renderLess(style)
  }
  
  changedFlexBalanced(mut) {
    if(!this.willBalance) this.balanceFlexBalanced()
  }
  
  balanceFlexBalanced() {
    if(this.willBalance) return
    
    requestAnimationFrame(t => {
      this.querySelectorAll(':scope > flex_balancer').forEach(e => e.remove())
      for(let i = 0; i < 10; i++) this.new('flex_balancer')
      setImmediate(e => this.willBalance = false)
    })
    
    this.willBalance = true
  }
}
