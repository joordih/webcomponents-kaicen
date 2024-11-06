import { configureStore } from '@reduxjs/toolkit'
import formsSlice from './slices/forms-slice.js'

export const store = configureStore({
  reducer: {
    forms: formsSlice
  }
})

export default store
