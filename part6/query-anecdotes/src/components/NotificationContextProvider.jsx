import { createContext, useReducer } from "react";

const NotificationContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "SET": {
            clearTimeout(state.timeout)
            return {content: action.content, timeout: action.timeout}
        }
        case "CLEAR": {
            return {content: "", timeout: null}
        }
    }
}

const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(reducer, {content: "", timeout: null})
    const setNotification = (content) => {
        const timeout = setTimeout(() => clearNotification(), 5000)
        dispatch({type: "SET", content: content, timeout: timeout})
    }
    const clearNotification = () => dispatch({type: "CLEAR"})

    return (
        <NotificationContext.Provider value={[notification, setNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext }
export default NotificationContextProvider