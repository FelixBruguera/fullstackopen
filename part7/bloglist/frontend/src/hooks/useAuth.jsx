import { useSelector, useDispatch } from 'react-redux'
import { set, clear } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import loginService from '../services/login'

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const session = localStorage.getItem('currentUser')
    if (session) {
      dispatch(set(JSON.parse(session)))
    }
  }, [dispatch])

  const login = async (credentials) => {
    const response = await loginService.login(credentials)
    if (response.status === 200) {
      dispatch(set(response.data))
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      dispatch(handleNotification('Succesfully logged in', 'info'))
    } else {
      dispatch(handleNotification(response.response.data, 'error'))
    }
  }
  const logout = () => {
    dispatch(clear())
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
