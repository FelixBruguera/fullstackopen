import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }
  return (
    <p className={`message ${notification.type}`}>{notification.message}</p>
  )
}

export default Notification
