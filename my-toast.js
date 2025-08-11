const toast = {
  options: {
    autoclose: false,
    position: 'left top',
    timeout: 3000
  },
  style: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    border: '1px solid #999',
    borderRadius: '4px',
    backgroundColor: '#eee',
    padding: '15px',
    width: '350px',
    zIndex: 10
  },
  success(text, opts = {}){
    this.options = {...this.options, ...opts}
    this.show('success', text)
  },
  error(text, opts = {}){
    this.options = {...this.options, ...opts}
    this.show('error', text)
  },
  warning(text, opts = {}){
    this.options = {...this.options, ...opts}
    this.show('warning', text)
  },
  info(text, opts = {}){
    this.options = {...this.options, ...opts}
    this.show('info', text)
  },
  show(type, text){
    const div = document.createElement('div')
    div.id = 'my-toast'
    div.className = `my-toast ${type}`
    div.innerText = text
    Object.entries(this.style).forEach(([prop, value]) => {
      div.style[prop] = value
    })

    document.body.prepend(div)
    console.log(div);
    

    // const html = `<div id="my-toast" class="my-toast ${type}">
    //   <p>${text}</p>
    //   ${!this.options.autoclose ? '<button type="button" onclick="toast.options.timeout=0;toast.hide()">&times;</button>' : ''}
    // </div>`

    // if (document.getElementById('my-toast')) {
    //   this.hide(0)
    // }

    // document.body.insertAdjacentHTML('afterbegin', html)
    this.options.autoclose && this.hide()
  },
  hide(){
    const el = document.getElementById('my-toast')
    if (el === null) return
    if (this.timeout === 0) {
      el.remove()
      return
    }
    setTimeout(()=>{
      el.remove()
    }, this.timeout)
  }
}





