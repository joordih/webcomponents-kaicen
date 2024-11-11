import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: []
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders.push(...action.payload)
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload)
    },
    editOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === Number(action.payload.id))
      state.orders[index] = action.payload
    }
  }
})

export const { addOrders, removeOrder, editOrder } = ordersSlice.actions
export default ordersSlice.reducer
