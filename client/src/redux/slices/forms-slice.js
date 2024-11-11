import { createSlice } from '@reduxjs/toolkit'

export const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    currentTab: 'general',
    inputs: {}
  },
  reducers: {
    addElement: (state, action) => {
      state.inputs[action.payload.id] = action.payload.element
    },
    removeElement: (state, action) => {
    },
    editElement: (state, action) => {
      state.inputs[action.payload.id] = action.payload.element
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
    }
  }
})

export const { addElement, removeElement, editElement, setCurrentTab } = formsSlice.actions
export const broadcastInputs = state => state.forms.inputs
export default formsSlice.reducer
