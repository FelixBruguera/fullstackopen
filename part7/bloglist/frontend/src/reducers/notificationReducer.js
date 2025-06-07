import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
  token: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    set(state, action) {
      clearTimeout(state.timeout)
      return action.payload
    },
    clear(state, action) {
      return initialState
    },
  },
})

export const handleNotification = (message, type) => {
  return async (dispatch) => {
    const timeout = setTimeout(() => dispatch(clear()), 5000)
    dispatch(set({ message, type, timeout }))
  }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer
