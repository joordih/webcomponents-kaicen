import { store } from '@redux/store.js'
import { addElement, setCurrentTab } from '@redux/slices/forms-slice.js'
import { editOrder } from '@redux/slices/orders-slice.js'

import generalSvg from '@icons/general-icon.svg?raw'
import miscSvg from '@icons/misc-icon.svg?raw'
import saveSvg from '@icons/save-icon.svg?raw'
import createSvg from '@icons/create-icon.svg?raw'
import deleteSvg from '@icons/delete-icon.svg?raw'

import style from '../../../assets/forms-component.css?inline'
import { incrementCount } from '../../../redux/slices/orders-slice'

class Forms extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(style)

    this.shadow.adoptedStyleSheets = [sheet]
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState()

      for (const input in state.forms.inputs) {
        const matchInput = this.shadow.querySelector(`#${input}`)

        if (matchInput) {
          matchInput.value = state.forms.inputs[input].value
        }
      }

      switch (state.forms.currentTab) {
        case 'general':
          this.shadow.querySelector('.general-tab').style.display = 'grid'
          this.shadow.querySelector('#general-button').classList.add('active')
          this.shadow.querySelector('.misc-tab').style.display = 'none'
          this.shadow.querySelector('#misc-button').classList.remove('active')
          this.shadow.querySelector('.create-tab').style.display = 'none'
          this.shadow.querySelector('.create-button-tab').style.display = 'none'
          this.shadow.querySelector('#create-button').classList.remove('active')
          break
        case 'misc':
          this.shadow.querySelector('.general-tab').style.display = 'none'
          this.shadow.querySelector('#general-button').classList.remove('active')
          this.shadow.querySelector('.misc-tab').style.display = 'grid'
          this.shadow.querySelector('#misc-button').classList.add('active')
          this.shadow.querySelector('.create-tab').style.display = 'none'
          this.shadow.querySelector('.create-button-tab').style.display = 'none'
          this.shadow.querySelector('#create-button').classList.remove('active')
          break
        case 'create':
          this.shadow.querySelector('.general-tab').style.display = 'none'
          this.shadow.querySelector('#general-button').classList.remove('active')
          this.shadow.querySelector('.misc-tab').style.display = 'none'
          this.shadow.querySelector('#misc-button').classList.remove('active')
          this.shadow.querySelector('.create-tab').style.display = 'grid'
          this.shadow.querySelector('.create-button-tab').style.display = 'flex'
          this.shadow.querySelector('#create-button').classList.add('active')
          break
        default:
          break
      }
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <div class="header">
      <div class="tab">
        <a id="general-button" href="#general">
          ${generalSvg}
          GENERAL
        </a>
      </div>
      <div class="tab">
        <a id="misc-button" href="#misc">
          ${miscSvg}
          MISC
        </a>
      </div>
      <div class="tab create-button-tab">
        <a id="create-button" href="#create">
          ${createSvg}
          CREATE
        </a>
      </div>
      <div class="tab-action">
        <a href="#save" class="actions">
          <button-component
            text="Guardar"
            background="#1f5314"
            background-hover="#206312"
            text-color="#51e633"
            border-radius="0.5rem"
          >
            ${saveSvg}
          </button-component>
        </a>
      </div>
    </div>
    <div class="inputs general-tab">
      <div>
        <label for="name">Nombre</label>
        <input type="text" id="name" class="input" placeholder="Nombre" value="" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" class="input" placeholder="Email" />
      </div>
      <div>
        <label for="date_of_creation">Fecha de creación</label>
        <input
          type="date"
          id="createdAt"
          class="input"
          placeholder="Date"
          disabled
        />
      </div>
      <div>
        <label for="date_of_update">Fecha de actualización</label>
        <input
          type="date"
          id="updatedAt"
          class="input"
          placeholder="Date"
          disabled
        />
      </div>
      <div class="id-input">
        <label for="date_of_update">Order Id</label>
        <input type="text" id="id" class="input" placeholder="Order Id" />
      </div>
    </div>
    <div class="inputs misc-tab">
      <div>
        <button-component
          text="Relleno"
          background="#531414"
          background-hover="#621212"
          text-color="#e63535"
          border-radius="0.375rem"
        >
          ${deleteSvg}
        </button-component>
      </div>
    </div>
    <div class="inputs create-tab">
      <div>
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          class="input"
          placeholder="Nombre"
          value=""
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" class="input" placeholder="Email" />
      </div>
      <div>
        <label for="date_of_creation">Fecha de creación</label>
        <input
          type="date"
          id="createdAt"
          class="input"
          placeholder="Date"
          disabled
        />
      </div>
      <div>
        <label for="date_of_update">Fecha de actualización</label>
        <input
          type="date"
          id="updatedAt"
          class="input"
          placeholder="Date"
          disabled
        />
      </div>
      <div class="id-input">
        <label for="date_of_update">Order Id</label>
        <input type="text" id="id" class="input" placeholder="Order Id" />
      </div>
    </div>
    `

    this.shadow.querySelector('.header').addEventListener('click', (event) => {
      event.preventDefault()

      if (event.target.closest('.tab')) {
        const clickedTab = event.target.closest('.tab').querySelector('a').getAttribute('href').replace('#', '')
        if (!clickedTab) return
        store.dispatch(setCurrentTab(clickedTab))
      }
    })

    this.shadow.querySelector('a.actions > button-component').addEventListener('click', async (event) => {
      event.preventDefault()
      switch (store.getState().forms.currentTab) {
        case 'general':
          await this.saveOrder()
          break
        case 'create':
          await this.createOrder()
          break
        default:
          break
      }
    })

    this.shadow.querySelectorAll('input').forEach(async (input, index) => {
      await store.dispatch(addElement({
        id: input.id,
        element: {
          value: input.value,
          type: input.type || undefined,
          placeholder: input.placeholder
        }
      }))
    })
  }

  async saveOrder () {
    const orderData = {}

    this.shadow.querySelectorAll('.general-tab > div > input').forEach((input, index) => {
      if (input !== null || input !== undefined) {
        orderData[input.id] = {
          value: input.value,
          type: input.type || undefined,
          placeholder: input.placeholder
        }
      }
    })

    const orderForm = Object.keys(orderData).reduce((acc, key) => {
      acc[key] = orderData[key].value
      console.log('Key:', key, 'Value:', orderData[key].value)
      return acc
    }, {})

    const response = await fetch('http://localhost:8080/api/admin/orders/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderForm)
    })

    if (response.ok) {
      await store.dispatch(editOrder(orderForm))
      this.render()
    }
  }

  async createOrder () {
    const orderData = {}

    this.shadow.querySelectorAll('.create-tab > div > input').forEach((input, index) => {
      if (input !== null || input !== undefined) {
        orderData[input.id] = {
          value: input.value,
          type: input.type || undefined,
          placeholder: input.placeholder
        }
      }
    })

    const orderForm = Object.keys(orderData).reduce((acc, key) => {
      acc[key] = orderData[key].value
      console.log('Key:', key, 'Value:', orderData[key].value)
      return acc
    }, {})

    const response = await fetch('http://localhost:8080/api/admin/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderForm)
    })

    if (response.ok) {
      store.dispatch(incrementCount())
      this.render()
    }
  }
}

customElements.define('forms-component', Forms)
