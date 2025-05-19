import { useContext } from "react"
import { NotificationContext } from "./NotificationContextProvider"

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification.content < 1) return null

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification
