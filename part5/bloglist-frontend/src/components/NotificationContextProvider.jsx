import { createContext, useReducer } from "react"

export const NotificationContext = createContext()

const NotificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET': {
            clearTimeout(state.timeout)
            return action.payload
    }
        case 'CLEAR': {
            return { message: '', type: '', timeout: null }
        }
  }
}

const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(NotificationReducer, { message: '', type: '', timeout: null })

    const handleNotification = (message, type) => {
        const timeout = setTimeout(() => clearNotification(), 5000)
        dispatch({ type: 'SET', payload: { message, type, timeout } })
    }
    const clearNotification = () => {
        dispatch({ type: 'CLEAR' })
    }
    return (
        <NotificationContext.Provider value={ [notification, handleNotification] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider
