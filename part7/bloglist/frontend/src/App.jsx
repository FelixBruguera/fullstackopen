import { useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import './styles/notification.css'
import useAuth from './hooks/useAuth'
import { Route, Routes } from 'react-router'

const App = () => {
  const [user, userService] = useAuth()
  console.log('Render app')

  if (user.id === null) {
    return (
      <div>
        <Notification />
        <Login handleLogin={userService.login} />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <div>
        <p> {user.name} logged in</p>
        <button type="button" onClick={() => userService.logout()}>
          Log out
        </button>
      </div>
      <Routes>
        <Route path='/' element={<BlogList userId={user.id}/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/users/:id' element={<User />}/>
      </Routes>
    </div>
  )
}

export default App
