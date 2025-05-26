import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  id: null,
  name: null,
  username: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return initialState
    },
  },
})

export const { set, clear } = userSlice.actions
export default userSlice.reducer
