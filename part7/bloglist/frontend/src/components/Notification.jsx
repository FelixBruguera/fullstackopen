import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }
  return (
    <p
      className={`fixed z-1 bottom-5 right-5 p-3 rounded-lg w-fit font-bold text-gray-200 transition-all
      ${notification.type === 'info' ? 'bg-blue-400' : 'bg-red-500'}`}
    >
      {notification.message}
    </p>
  )
}

export default Notification
