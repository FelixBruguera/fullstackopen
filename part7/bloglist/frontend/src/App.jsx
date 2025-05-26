import { useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './styles/notification.css'
import useBlogs from './hooks/useBlogs'
import useAuth from './hooks/useAuth'

const App = () => {
  const newBlogButton = useRef('')
  const [user, userService] = useAuth()
  const [data, isLoading, error] = useBlogs()
  console.log('Render app')

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (user.id === null) {
    return (
      <div>
        <Notification />
        <Login handleLogin={userService.login} />
      </div>
    )
  }

  const blogs = data.sort((a, b) => b.likes - a.likes)

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
      <h2>Create new blog</h2>
      <Togglable buttonLabel="New Blog" reference={newBlogButton}>
        <NewBlog togglable={newBlogButton} />
      </Togglable>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} userId={user.id} />
        ))}
      </ul>
    </div>
  )
}

export default App
