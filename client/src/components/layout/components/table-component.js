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
      // const state = store.getState()
      this.render()
    })

    await fetch('http://localhost:8080/admin/orders')
      .then(response => response.json())
      .then(data => store.dispatch(addOrders(data)))
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

      /*.order-card-* {*/
      tr[class*="order-card"] {
        display: grid;
        background-color: #8d54e8;
        color: white;
        width: 400px;
        margin-top: 5px;
        border-radius: 0.20rem;
        grid-template-columns: 5fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
          "name"
          "product"
          "quantity"
          "price";

          td:not(:first-child) {
            font-family: Ubuntu, sans-serif;
            padding: .2rem 0.5rem .2rem 0.5rem;
          }

          .card-header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background-color: #BB98F1;
            padding: 0.5rem;
            margin: 0px;
          }

          &:last-child {
            margin-bottom: 5px;
          }
      }

      div svg {
        color: #260659;
        shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        transition: color 0.3s;
        margin: 0 0.3rem;

        &:hover {
          color: white;
        }
      }

      .orders-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: #BB98F1;
        padding: .5rem;
        border-radius: 0.20rem;
      }

      .footer {
        display: flex;
        font-family: Ubuntu, sans-serif;
        justify-content: flex-start;
        align-items: center;
        border-radius: 0.20rem;
        background-color: #BB98F1;
        padding: 1rem;
        width: 95%;
      }
    </style>
    <div class="orders-header">
      <a href="#filter">
        <i class="fa-duotone fa-solid fa-filters"></i>
      </a>
    </div>
    <table id="orders">
      <tbody class="hidden-scrollbar">
      </tbody>
    </table>
    <div class="footer">
      Amount of orders: ${orders.length}
    </div>
    `

    const tableBody = this.shadow.querySelector('#orders')

    store.getState().orders.orders.forEach((order, index) => {
      const row = tableBody.insertRow()

      row.classList.add('order-card')
      row.dataset.id = order.id

      const actionCell = row.insertCell(0)
      const nameCell = row.insertCell(1)
      const emailCell = row.insertCell(2)
      const creationDateCell = row.insertCell(3)
      const updateDateCell = row.insertCell(4)

      actionCell.appendChild(this.createActionCell(order.id))

      // const editButtons = this.shadow.querySelectorAll('.edit-button')

      // editButtons.forEach(buttons => {
      //   const editButton = buttons.closest(`.order-card[data-id='${order.id}']`)
        
      //   if (editButton) {
      //     editButton.addEventListener('click', (event) => {
      //       const itemId = event.target.closest('.order-card').dataset.id
      //       const order = store.getState().orders.orders.find(order => order.id === Number(itemId))

      //       for (const value in order) {
      //         console.log(this.checkItemType({ value, order }))
      //         const inputValue = {
      //           id: value,
      //           element: {
      //             value: this.checkItemType({ value, order })
      //           }
      //         }

      //         store.dispatch(editElement(inputValue))
      //       }
      //     })
      //   }
      // })

      // const deleteButtons = this.shadow.querySelectorAll('.delete-button')

      // console.log(Array.from(document.querySelectorAll(`.order-card[data-id='18']`)).map(order => order.closest('.delete-button')));

      // deleteButtons.forEach(buttons => {
      //   const itemButton = buttons.closest(`.order-card[data-id='${order.id}']`)
      //   console.log(itemButton)
        
      //   if (itemButton) {
      //     itemButton.addEventListener('click', async (event) => {
      //       const itemId = event.target.closest('.order-card').dataset.id
      //       const order = store.getState().orders.orders.find(order => order.id === Number(itemId))

      //       await fetch(`http://localhost:8080/admin/orders/delete?id=${order.id}`)
      //         .then(response => console.log(response.json))
      //         .catch(error => console.error(error))
      //     })
      //   }
      // })
      
      nameCell.textContent = `Nombre: ${order.name}`
      emailCell.textContent = `Email: ${order.email}`
      creationDateCell.textContent = `Fecha de creación: ${new Date(order.date_of_creation).toLocaleString()}`
      updateDateCell.textContent = `Fecha de actualización: ${new Date(order.date_of_update).toLocaleString()}`
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

  addEventListener () {
    this.shadow.querySelectorAll('.order-card .edit-button').forEach(button => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation()

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
      })
    })

    this.shadow.querySelectorAll('.order-card .delete-button').forEach(button => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation()
        
        const orderCard = button.closest('.order-card')

        const dataId = orderCard.dataset.id
        const order = store.getState().orders.orders.find(order => order.id === Number(dataId))
    
        if (!order) return
    
        try {
          const response = await fetch(`http://localhost:8080/admin/orders/delete?id=${dataId}`)
          
          if (response.ok) {
            await store.dispatch(removeOrder(order))

            this.shadow.getElementById(`.card-header[data-id='${dataId}']`).remove()
            this.render()
          }
        } catch (error) {
          console.error('Error al intentar eliminar la orden:', error)
        }
      })
    })
  }

  createActionCell (id) {
    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header', `header-${id}`)

    const editButton = document.createElement('a')

    editButton.classList.add('edit-button', `edit-${id}`)
    editButton.innerHTML =
    `
    <svg width="21" height="21" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L17.625 2.175L21.8 6.45L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
    </svg>
    `

    const deleteButton = document.createElement('a')

    deleteButton.classList.add('delete-button', `delete-${id}`)
    deleteButton.innerHTML =
    `
    <svg width="21" height="21" viewBox="0 0 24 24">
      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"/>
    </svg>
    `

    cardHeader.appendChild(editButton)
    cardHeader.appendChild(deleteButton)

    return cardHeader
  }
}

customElements.define('table-component', Table)
