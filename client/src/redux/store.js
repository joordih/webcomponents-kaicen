import { configureStore } from '@reduxjs/toolkit'
import formsSlice from './slices/forms-slice.js'
import ordersSlice from './slices/orders-slice.js'

export const store = configureStore({
  reducer: {
    forms: formsSlice,
    orders: ordersSlice
  }
})

export default store
