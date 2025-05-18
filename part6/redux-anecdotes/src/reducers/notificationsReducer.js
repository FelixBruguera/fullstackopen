import { createSlice } from '@reduxjs/toolkit'

const notificationsReducer = createSlice({
    name: "notifications",
    initialState: {content: "", timeout: null},
    reducers: {
        setNotification(state, action) {
            clearTimeout(state.timeout)
            return action.payload
        },
        clearNotification() {
            return {content: "", timeout: null}
        }
    },
})

export const newNotification = (content, seconds) => {
    return async dispatch => {
        const timeout = setTimeout(() => dispatch(clearNotification()), seconds*1000)
        dispatch(setNotification({content: content, timeout: timeout}))
    }
}

export const { setNotification, clearNotification } = notificationsReducer.actions
export default notificationsReducer.reducer