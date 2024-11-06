import { store } from '@redux/store.js'
import { editElement } from '@redux/slices/forms-slice.js'

class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.data = {
      orders: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          date_of_creation: '2024-10-01T10:23:00Z',
          date_of_update: '2024-10-03T14:15:00Z'
        },
        {
          id: 2, 
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          date_of_creation: '2024-09-28T08:50:00Z',
          date_of_update: '2024-10-02T12:35:00Z'
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael.johnson@example.com',
          date_of_creation: '2024-09-25T13:45:00Z',
          date_of_update: '2024-09-30T11:20:00Z'
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          date_of_creation: '2024-10-05T09:15:00Z',
          date_of_update: '2024-10-06T15:50:00Z'
        },
        {
          id: 5,
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          date_of_creation: '2024-10-02T11:30:00Z',
          date_of_update: '2024-10-04T17:05:00Z'
        },
        {
          id: 6,
          name: 'Sarah Miller',
          email: 'sarah.miller@example.com',
          date_of_creation: '2024-09-29T07:40:00Z',
          date_of_update: '2024-10-01T18:00:00Z'
        },
        {
          id: 7,
          name: 'Chris Brown',
          email: 'chris.brown@example.com',
          date_of_creation: '2024-10-03T14:20:00Z',
          date_of_update: '2024-10-05T09:45:00Z'
        },
        {
          id: 8,
          name: 'Laura White',
          email: 'laura.white@example.com',
          date_of_creation: '2024-10-04T16:10:00Z',
          date_of_update: '2024-10-06T12:30:00Z'
        },
        {
          id: 9,
          name: 'James Harris',
          email: 'james.harris@example.com',
          date_of_creation: '2024-10-01T12:55:00Z',
          date_of_update: '2024-10-02T10:40:00Z'
        },
        {
          id: 10,
          name: 'Amanda Clark',
          email: 'amanda.clark@example.com',
          date_of_creation: '2024-09-26T18:05:00Z',
          date_of_update: '2024-09-28T13:50:00Z'
        }
      ]
    }
    this.render()
  }

  render () {
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
      Amount of orders: ${this.data.orders.length}
    </div>
    `

    const tableBody = this.shadow.querySelector('#orders')

    this.data.orders.forEach((order, index) => {
      const row = tableBody.insertRow()

      row.classList.add('order-card')
      row.dataset.id = order.id

      const actionCell = row.insertCell(0)
      const nameCell = row.insertCell(1)
      const emailCell = row.insertCell(2)
      const creationDateCell = row.insertCell(3)
      const updateDateCell = row.insertCell(4)

      actionCell.appendChild(this.createActionCell())

      const editButtons = this.shadow.querySelectorAll('.edit-button')

      editButtons.forEach(buttons => {
        const editButton = buttons.closest(`.order-card[data-id='${order.id}']`)
        
        if (editButton) {
          editButton.addEventListener('click', (event) => {
            const itemId = event.target.closest('.order-card').dataset.id
            const order = this.data.orders.find(order => order.id === Number(itemId))

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
        }
      })

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

  createActionCell () {
    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')

    const editButton = document.createElement('a')

    editButton.classList.add('edit-button')
    editButton.innerHTML =
    `
    <svg width="21" height="21" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L17.625 2.175L21.8 6.45L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
    </svg>
    `

    const deleteButton = document.createElement('a')

    deleteButton.classList.add('delete-button')
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
