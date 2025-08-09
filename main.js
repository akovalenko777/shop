const CART = [
  {
    title: 'Milk',
    price: 32.8,
    qty: 2,
    isBuy: false
  },
  {
    title: 'Bread',
    price: 28.5,
    qty: 1,
    isBuy: false
  }
]

function _el(id) {
  return document.getElementById(id)
}

document.addEventListener('keydown', function (event) {
  if (event.target.classList.contains('form-control'))
    resetError(event.target)
})

function resetError(elem) {
  elem.classList.remove("is-invalid")
  elem.parentElement.classList.remove("is-invalid")
  elem.parentElement.nextElementSibling.innerText = ''
}

const formElementsValidation = [
  {
    id: 'prod_title',
    conditions: [
      {
        condition: (value) => value === '',
        msg: 'Enter product name'
      }
    ]
  },
  {
    id: 'prod_price',
    conditions: [
      {
        condition: (value) => isNaN(value),
        msg: 'Enter price value'
      },
      {
        condition: (value) => value <= 0,
        msg: 'Price must be positive'
      }
    ]
  },
  {
    id: 'prod_qty',
    conditions: [
      {
        condition: (value) => isNaN(value),
        msg: 'Enter quantity'
      },
      {
        condition: (value) => value <= 0,
        msg: 'Quantity must be positive'
      },
      {
        condition: (value) => value > 10,
        msg: 'Quantity must be less than 10'
      }
    ]
  }
]

function validate() {
  let isValid = true
  formElementsValidation.forEach(elem => {
    const $elem = _el(elem.id)
    const value = $elem.type === "text" ? $elem.value : $elem.valueAsNumber
    elem.conditions.forEach(item => {
      if (item.condition(value)) {
        isValid = false
        $elem.classList.add("is-invalid")
        $elem.parentElement.classList.add("is-invalid")
        $elem.parentElement.nextElementSibling.innerText = item.msg
      }
    })
  })

  return isValid
}

function addToCart() {
  const title = _el("prod_title").value
  const price = _el("prod_price").valueAsNumber
  const qty = _el("prod_qty").valueAsNumber

  if (!validate()) return

  const index = CART.findIndex((el) => el.title === title)
  if (index === -1) {
    CART.push({
      title,
      price,
      qty,
      isBuy: false
    })
  } else {
    CART[index].qty += qty
  }

  _el("prod_form").reset()
  _el("prod_title").focus()
  showProduct()
}

function showProduct() {
  let html = ''
  CART.forEach((prod, index) => {
    html += `<tr>
      <td> ${index + 1}</td>
      <td>${prod.title}</td>
      <td>${prod.isBuy ? '<span class="badge text-bg-success">Yes</span>' : '<span class="badge text-bg-danger">No</span>'}</td>
      <td>${prod.qty}</td>
      <td>${prod.price}</td>
      <td>${prod.price * prod.qty}</td>
      <td>
        <button type="button" class="btn btn-info btn-sm" onclick="buyProduct(${index})">Buy</button>
      </td>
    </tr> `
  })
  _el('prod_list').innerHTML = html
}



function buyProduct(index) {
  CART[index].isBuy = true;
  showProduct()
}


showProduct()
