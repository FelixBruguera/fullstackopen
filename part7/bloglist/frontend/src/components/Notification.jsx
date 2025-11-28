import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }
  {notification.message}
  return (
    <p
      className={`fixed z-1 bottom-5 right-5 p-3 rounded-lg w-fit font-bold text-gray-200 transition-colors
      ${notification.type === 'info' ? 'bg-blue-900' : 'bg-red-500'}`}
    >
      {notification.message}
    </p>
  )
}

export default Notification
