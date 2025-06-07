import Blog from './components/Blog'
import Login from './components/Login'
import Signup from './components/Signup'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Nav from './components/Nav'
import './styles/app.css'
import useAuth from './hooks/useAuth'
import { Route, Routes } from 'react-router'

const App = () => {
  const [user, userService] = useAuth()

  if (user.id === null) {
    return (
      <div className="px-10 h-screen">
        <Nav />
        <Routes>
          <Route
            index
            path="/"
            element={<Login handleLogin={userService.login} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Notification />
      </div>
    )
  }

  return (
    <div className="px-5 lg:px-10 h-screen flex flex-col items-center">
      <Nav />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog userId={user.id} />} />
      </Routes>
      <Notification />
    </div>
  )
}

export default App
