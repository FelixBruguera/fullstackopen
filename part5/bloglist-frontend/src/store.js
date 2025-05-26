import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer.js'
import notificationsReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationsReducer,
  },
})

export default store
