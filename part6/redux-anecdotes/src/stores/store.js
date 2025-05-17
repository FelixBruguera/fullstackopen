import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationsReducer from "../reducers/notificationsReducer"

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationsReducer
  }
})

export default store