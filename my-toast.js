const toast = {
  options: {
    autoclose: true,
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
  types: {
    success: {
      backgroundColor: '#cbffcb',
      borderColor: '#004600'
    },
    error: {
      backgroundColor: '#ffcbcb',
      borderColor: '#560001'
    },
    warning: {
      backgroundColor: '#fff2cb',
      borderColor: '#b88100'
    },
    info: {
      backgroundColor: '#cbf8ff',
      borderColor: '#006192'
    }
  },
  init(){
    Object.keys(this.types).forEach(type => {
      this[type] = (text, opts={}) => {
        this.show(type, text, {...this.options, ...opts})
      }
    })
  },
  show(type, text, options){
    const div = document.createElement('div')
    div.id = 'my-toast'
    Object.entries({...this.style, ...this.types[type]}).forEach(([prop, value]) => {
      div.style[prop] = value
    })
    
    const p = document.createElement('p')
    p.innerText = text
    div.append(p)

    if (!options.autoclose) {
      const button = document.createElement('button')
      button.type = 'button'
      button.innerText = '×'
      button.onclick = ()=>{this.hide(0)}
      div.append(button)
    }
    
    if (document.getElementById('my-toast')) {
      this.hide(0)
    }

    document.body.prepend(div)

    // const html = `<div id="my-toast" class="my-toast ${type}">
    //   <p>${text}</p>
    //   ${!this.options.autoclose ? '<button type="button" onclick="toast.hide(0)">&times;</button>' : ''}
    // </div>`
    // document.body.insertAdjacentHTML('afterbegin', html)
    options.autoclose && this.hide(options.timeout)
  },
  hide(timeout = 0){
    const el = document.getElementById('my-toast')
    if (el === null) return
    if (timeout === 0) {
      el.remove()
      return
    }
    setTimeout(()=>{
      el.remove()
    }, timeout)
  }
}

toast.init()




