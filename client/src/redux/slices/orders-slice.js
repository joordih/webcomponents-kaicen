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
    }
  }
})

export const { addOrders, removeOrder } = ordersSlice.actions
export default ordersSlice.reducer
