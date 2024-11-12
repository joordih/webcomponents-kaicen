import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    searchTerm: '',
    count: 0
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    addOrders: (state, action) => {
      state.orders = action.payload
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload)
    },
    editOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === Number(action.payload.id))
      state.orders[index] = action.payload
    },
    clearOrders: (state) => {
      state.orders = []
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    incrementCount: (state) => {
      state.count++
    }
  }
})

export const { 
  addOrder, 
  addOrders, 
  removeOrder, 
  editOrder, 
  clearOrders,
  setSearchTerm,
  setCount,
  incrementCount
} = ordersSlice.actions

export default ordersSlice.reducer
