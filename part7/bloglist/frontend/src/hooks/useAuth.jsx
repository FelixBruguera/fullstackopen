import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { loginService } from '../services/axios'

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const session = localStorage.getItem('currentUser')
    if (session) {
      dispatch(setUser(JSON.parse(session)))
    }
  }, [dispatch])

  const login = (credentials) => {
    loginService
      .post('/', credentials)
      .then((response) => {
        dispatch(setUser(response.data))
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        dispatch(handleNotification('Succesfully logged in', 'info'))
      })
      .catch((response) =>
        dispatch(handleNotification(response.response.data, 'error')),
      )
  }
  const logout = () => {
    dispatch(clearUser())
    localStorage.removeItem('currentUser')
    dispatch(handleNotification('Succesfully logged out', 'info'))
  }

  const service = {
    login,
    logout,
  }

  return [user, service]
}

export default useAuth
