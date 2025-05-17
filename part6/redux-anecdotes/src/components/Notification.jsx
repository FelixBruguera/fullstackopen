import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { update } from "../reducers/notificationsReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    let timer = null
    if (notification.length >= 1) {
      timer = setTimeout(() => dispatch(update("")), 5000)
    }
    return () => clearTimeout(timer)
  },[notification, dispatch])

  if (notification.length < 1) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification