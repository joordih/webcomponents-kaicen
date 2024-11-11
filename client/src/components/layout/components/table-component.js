import { store } from '@redux/store.js'
import { editElement } from '@redux/slices/forms-slice.js'
import { addOrders, removeOrder } from '@redux/slices/orders-slice.js'

class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      this.render()
    })

    await fetch('http://localhost:8080/admin/orders')
      .then(response => response.json())
      .then(data => {
        if (data.message === 'No orders found') {
          return console.log('No orders found')
        }

        store.dispatch(addOrders(data))
      })
      .catch(error => console.error(error))

    this.render()
  }

  disconnectedCallback () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render () {
    const orders = store.getState().orders.orders

    this.shadow.innerHTML = 
    /* html */`
      <style>
        .hidden-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;

          :state(--webkit-scrollbar) {
            background: transparent;
            width: 0px;
          }
        }

        #orders tbody {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          overflow-y: scroll;
          max-height: 80vh;
        }

        tr[class*="order-card"] {
          display: grid;
          color: white;
          width: 400px;
          margin-top: 5px;
          border-radius: 0.5rem;
          grid-template-columns: 5fr;
          gap: 0px 0px;
          font-family: "Geist", sans-serif;
          font-weight: 500;
          grid-auto-flow: row;
          grid-template-areas:
            "name"
            "product"
            "quantity"
            "price";
          border: 1px solid hsl(240 3.7% 15.9%);

          &:hover {
            background-color: #27272A;
          }

          span {
            font-family: "Geist Mono", monospace;
            font-weight: 300;
            font-size: 0.9rem;
          }

          td:not(:first-child) {
            padding: .2rem 0.5rem .2rem 0.5rem;
          }

          .card-header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            /*background-color: rgb(39, 39, 42); */
            padding: 0.5rem;
            margin: 0px;

            span {
              margin-right: auto;
            }
          }

          &:last-child {
            margin-bottom: 5px;
          }
        }

        div svg {
          color: white;
          shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
          transition: color 0.3s;
          margin: 0 0.3rem;

          &:hover {
            color: #7f7f7f;
          }
        }

        .orders-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: rgb(39, 39, 42);
          padding: .5rem 0rem .5rem 1rem;
          border-radius: 0.5rem;
          font-family: "Geist Mono", monospace;
          color: white;
        }

        .footer {
          display: flex;
          font-family: "Geist Mono", monospace;
          justify-content: flex-start;
          align-items: center;
          border-radius: 0.5rem;
          background-color: rgb(39, 39, 42);
          color: white;
          padding: 1rem;
          width: 95%;
        }
      </style>
      <div class="orders-header">
        Amount of orders: ${orders.length}
        <a href="#filter">
          <i class="fa-duotone fa-solid fa-filters"></i>
        </a>
      </div>
      <table id="orders">
        <tbody class="hidden-scrollbar">
        </tbody>
      </table>
      <div class="footer"></div>
    `

    const tableBody = this.shadow.querySelector('#orders tbody')

    orders.forEach((order, index) => {
      const row = document.createElement('tr')
      row.classList.add('order-card')
      row.dataset.id = order.id

      const actionCell = document.createElement('td')
      const nameCell = document.createElement('td')
      const emailCell = document.createElement('td')
      const creationDateCell = document.createElement('td')
      const updateDateCell = document.createElement('td')

      actionCell.appendChild(this.createActionCell(index, order.id))
      nameCell.innerHTML = `Nombre: <span>${order.name}</span>`
      emailCell.innerHTML = `Email: <span>${order.email}</span>`
      creationDateCell.innerHTML = `Fecha de creación: <span>${order.date_of_creation}</span>`
      updateDateCell.innerHTML = `Fecha de actualización: <span>${order.date_of_update}</span>`

      row.appendChild(actionCell)
      row.appendChild(nameCell)
      row.appendChild(emailCell)
      row.appendChild(creationDateCell)
      row.appendChild(updateDateCell)

      tableBody.appendChild(row)
    })

    this.addEventListeners()
  }

  pushPopup () {
    const body = document.querySelector('body')
    
    const title = 'Are you sure you want to delete this order?'
    const message = 'Remember that this action cannot be undone.'
    
    body.insertAdjacentHTML('afterbegin', `<popup-component id='popup-component' title='${title}' message='${message}'></popup-component>`)
  }

  addEventListeners () {
    const tableBody = this.shadow.querySelector('#orders tbody')
  
    tableBody.addEventListener('click', async (event) => {
      if (event.target.closest('.delete-button')) {
        this.pushPopup()
        
        const button = event.target.closest('.delete-button')
        const orderCard = button.closest('.order-card')
        const dataId = orderCard.dataset.id
        const order = store.getState().orders.orders.find(order => order.id === Number(dataId))

        if (!order) return

        document.querySelector('#popup-component').shadowRoot.querySelector('#continue-button').addEventListener('click', async () => {
          try {
            const response = await fetch(`http://localhost:8080/admin/orders/delete?id=${dataId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
    
            if (response.ok) {
              await store.dispatch(removeOrder(order.id))
    
              console.log(dataId)
              const orderElement = this.shadow.querySelector(`tr.order-card[data-id='${dataId}']`)
    
              if (orderElement) {
                console.log('Elemento eliminado:', orderElement)
                orderElement.remove()
              } else {
                console.log(`El elemento con data-id='${dataId}' ya ha sido eliminado.`)
              }
            }
          } catch (error) {
            console.error('Error al intentar eliminar la orden:', error)
          }
        })
      }
      
      if (event.target.closest('.edit-button')) {
        const itemId = event.target.closest('.order-card').dataset.id
        const order = store.getState().orders.orders.find(order => order.id === Number(itemId))

        for (const value in order) {
          console.log(this.checkItemType({ value, order }))
          const inputValue = {
            id: value,
            element: {
              value: this.checkItemType({ value, order })
            }
          }

          store.dispatch(editElement(inputValue))
        }
      }
    })
  }

  checkItemType ({ value, order }) {
    switch (value) {
      case 'date_of_creation':
        return new Date(order[value]).toISOString().slice(0, 10)
      case 'date_of_update':
        return new Date(order[value]).toISOString().slice(0, 10)
      default:
        return order[value]
    }
  }

  createActionCell (index, id) {
    const div = document.createElement('div')
    div.classList.add('card-header', `header-${id}`)

    const headerTitle = document.createElement('span')
    headerTitle.textContent = `Order #${index + 1}`
    div.appendChild(headerTitle)

    const editButton = document.createElement('a')
    editButton.classList.add('edit-button', `edit-${id}`)
    editButton.innerHTML = `
      <svg width="21" height="21" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L17.625 2.175L21.8 6.45L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"></path>
      </svg>
    `
    div.appendChild(editButton)

    const deleteButton = document.createElement('a')
    deleteButton.classList.add('delete-button', `delete-${id}`)
    deleteButton.innerHTML = `
      <svg width="21" height="21" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"></path>
      </svg>
    `
    div.appendChild(deleteButton)

    return div
  }
}

customElements.define('table-component', Table)
