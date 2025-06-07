import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser } from '../reducers/userReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { loginService } from '../services/axios'
import { redirect } from 'react-router'

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const session = localStorage.getItem('currentUser')
    if (user.token === null && session) {
      dispatch(setUser(JSON.parse(session)))
    }
  }, [dispatch, user.token])

  const login = (credentials) => {
    loginService
      .post('/', credentials)
      .then((response) => {
        dispatch(setUser(response.data))
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        dispatch(handleNotification('Succesfully logged in', 'info'))
      })
      .catch((response) =>
        dispatch(
          handleNotification(
            response.response.data || 'Something went wrong',
            'error',
          ),
        ),
      )
  }
  const logout = () => {
    dispatch(clearUser())
    localStorage.removeItem('currentUser')
    dispatch(handleNotification('Succesfully logged out', 'info'))
    return redirect('/')
  }

  const service = {
    login,
    logout,
  }

  return [user, service]
}

export default useAuth
