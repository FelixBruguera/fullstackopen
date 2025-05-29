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
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
