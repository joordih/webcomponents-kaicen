import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    queuedUpdate: false,
    users: [],
    searchTerm: '',
    count: 0
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    addUsers: (state, action) => {
      state.users = action.payload
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    editUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === Number(action.payload.id))
      state.users[index] = action.payload
    },
    clearUsers: (state) => {
      state.users = []
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    incrementCount: (state) => {
      state.count++
    },
    decrementCount: (state) => {
      state.count--
    },
    setQueuedUpdate: (state, action) => {
      state.queuedUpdate = action.payload
    }
  }
})

export const { 
  addUser, 
  addUsers, 
  removeUser, 
  editUser, 
  clearUsers, 
  setSearchTerm, 
  setCount, 
  incrementCount, 
  decrementCount, 
  setQueuedUpdate
} = usersSlice.actions

export default usersSlice.reducer
