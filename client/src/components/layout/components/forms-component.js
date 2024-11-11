import { store } from '@redux/store.js'
import { addElement, setCurrentTab } from '@redux/slices/forms-slice.js'
import { addOrder, editOrder } from '@redux/slices/orders-slice.js'

class Forms extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
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
    <style>
      .header {
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
        padding: 0.1rem;
        border-radius: 0.5rem;
        background-color: #27272a;
        grid-area: header;

        .tab-action {
          font-family: "Geist Mono", monospace;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-left: auto;
          margin-right: -0.3rem;
          padding: 0.5rem;

          a {
            display: flex;
            justify-content: center;
            align-items: center;

            color: white;
            text-decoration: none;

            svg {
              margin: 1px;
            }
          }
        }

        .tab {
          font-family: "Geist Mono", monospace;
          display: flex;
          align-items: center;
          margin: 0 0.1rem;
          padding: 0.2rem;

          justify-content: center;
          border-radius: 0.2rem;
          transition: background-color 0.3s;

          .active {
            background-color: black;

            &:hover {
              background-color: #0f0f0f;
            }
          }

          > a:not(.active) {
            color: rgb(161, 161, 170);
          }

          a {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.35rem 0.7rem 0.35rem 0.7rem;
            border-radius: 0.5rem;
            color: white;
            text-decoration: none;

            &:hover:not(.active) {
              background-color: #1f1f1f;
            }

            svg {
              margin: 1px;
            }
          }
        }
      }

      .inputs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(9, 1fr);
        gap: 8px;
        padding: 1.5rem;
        margin: 0.5rem 0 0 0.5rem;
        grid-area: inputs;

        border: 1px solid hsl(240 3.7% 15.9%);
        border-radius: 0.5rem;

        div {
          display: flex;
          flex-direction: column;
          width: 100%;

          label {
            font-family: "Geist", sans-serif;

            font-size: 1rem;
            color: white;

            margin-top: -0.5rem;
            margin-bottom: 0.25rem;
          }
        }

        .id-input {
          display: none;
        }

        .input {
          border: 1px solid hsl(240 3.7% 15.9%);
          height: 2.5em;
          padding-left: 0.8em;
          outline: none;
          overflow: hidden;
          background-color: transparent;
          color: #6f6f6f;
          border-radius: 0.2rem;
          transition: all 0.5s;

          &:hover,
          &:focus {
            border: 1px solid white;
            box-shadow: 0px 0px 0px 4.5px rgb(74, 157, 236, 20%);
          }
        }

        label {
          margin-bottom: 0.5rem;
        }
      }
    </style>
    <div class="header">
      <div class="tab">
        <a id="general-button" href="#general">
          <svg width="21" height="21" viewBox="0 0 26 26">
            <defs>
              <symbol id="lineMdCogLoop0">
                <path
                  d="M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.6 7.4 16.8 7.61 16.99 7.83C17.46 8.4 17.85 9.05 18.11 9.77C18.2 10.03 18.28 10.31 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    begin="0.9s"
                    dur="0.2s"
                    values="M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.6 7.4 16.8 7.61 16.99 7.83C17.46 8.4 17.85 9.05 18.11 9.77C18.2 10.03 18.28 10.31 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12;M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.38 7.2 19 6.12 19.01 6.14C19.01 6.14 20.57 8.84 20.57 8.84C20.58 8.87 18.35 10.59 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12"
                  />
                </path>
              </symbol>
            </defs>
            <g fill="none" stroke="currentColor" stroke-width="2">
              <g stroke-linecap="round">
                <path
                  stroke-dasharray="20"
                  stroke-dashoffset="20"
                  d="M12 9c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.2s"
                    values="20;0"
                  />
                </path>
                <path
                  stroke-dasharray="48"
                  stroke-dashoffset="48"
                  d="M12 5.5c3.59 0 6.5 2.91 6.5 6.5c0 3.59 -2.91 6.5 -6.5 6.5c-3.59 0 -6.5 -2.91 -6.5 -6.5c0 -3.59 2.91 -6.5 6.5 -6.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.2s"
                    dur="0.6s"
                    values="48;0"
                  />
                  <set fill="freeze" attributeName="opacity" begin="0.9s" to="0" />
                </path>
              </g>
              <g opacity="0">
                <use href="#lineMdCogLoop0" />
                <use href="#lineMdCogLoop0" transform="rotate(60 12 12)" />
                <use href="#lineMdCogLoop0" transform="rotate(120 12 12)" />
                <use href="#lineMdCogLoop0" transform="rotate(180 12 12)" />
                <use href="#lineMdCogLoop0" transform="rotate(240 12 12)" />
                <use href="#lineMdCogLoop0" transform="rotate(300 12 12)" />
                <set fill="freeze" attributeName="opacity" begin="0.9s" to="1" />
                <animateTransform
                  fill="freeze"
                  attributeName="transform"
                  dur="30s"
                  type="rotate"
                  values="0 12 12;360 12 12"
                />
              </g>
            </g>
          </svg>
          GENERAL
        </a>
      </div>
      <div class="tab">
        <a id="misc-button" href="#misc">
          <svg width="21" height="21" viewBox="0 0 26 26">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 5l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 12l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 19l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.8s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <g
                fill="currentColor"
                fill-opacity="0"
                stroke-dasharray="24"
                stroke-dashoffset="24"
                stroke-width="1"
              >
                <path
                  d="M11.5 5c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.3s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.2s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
                <path
                  d="M11.5 12c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.7s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.6s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
                <path
                  d="M11.5 19c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="2.1s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
              </g>
            </g>
          </svg>
          MISC
        </a>
      </div>
      <div class="tab create-button-tab">
        <a id="create-button" href="#create">
          <svg width="21" height="21" viewBox="0 0 26 26">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 5l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 12l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path stroke-dasharray="10" stroke-dashoffset="10" d="M3 19l2 2l4 -4">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.8s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <g
                fill="currentColor"
                fill-opacity="0"
                stroke-dasharray="24"
                stroke-dashoffset="24"
                stroke-width="1"
              >
                <path
                  d="M11.5 5c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.3s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.2s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
                <path
                  d="M11.5 12c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.7s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.6s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
                <path
                  d="M11.5 19c0 -0.83 0.67 -1.5 1.5 -1.5h6c0.83 0 1.5 0.67 1.5 1.5c0 0.83 -0.67 1.5 -1.5 1.5h-6c-0.83 0 -1.5 -0.67 -1.5 -1.5Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="2.1s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.2s"
                    values="24;0"
                  />
                </path>
              </g>
            </g>
          </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 -0.5 25 25"
            >
              <path d="M10 17h4v4h-4z" />
              <path
                d="m20.12 8.71l-4.83-4.83A3 3 0 0 0 13.17 3H10v6h5a1 1 0 0 1 0 2H9a1 1 0 0 1-1-1V3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4h2a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12"
              />
            </svg>
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
          <svg
            viewBox="0 -0.5 25 25"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
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
      const order = await response.json()

      const orderData = {
        id: order.id,
        name: order.name,
        email: order.email,
        createdAt: order.createdAt.toString(),
        updatedAt: order.updatedAt.toString()
      }

      await store.dispatch(addOrder(orderData))
      this.render()
    }
  }
}

customElements.define('forms-component', Forms)
