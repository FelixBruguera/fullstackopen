import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/notification.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userValue, setUserValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [notification, setNotification] = useState({})
  const newBlogButton = useRef('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)))
  }, [])

  useEffect(() => {
    const session = localStorage.getItem('currentUser')
    if (session) {
      setUser(JSON.parse(session))
    }
  }, [])

  const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

  const logOut = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    handleNotification('Succesfully logged out', 'info')
  }

  const handleDelete = async (data) => {
    try {
      const response = await blogService.remove(data, user.token)
      const updatedBlogs = blogs.filter((blog) => blog.id !== data.id)
      setBlogs(updatedBlogs)
      handleNotification(
        `Succesfully deleted ${data.title} by ${data.author}`,
        'info',
      )
    } catch (error) {
      handleNotification(error.response.data, 'error')
    }
  }

  const handleUpdate = async (data) => {
    try {
      const response = await blogService.update(data, user.token)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === data.id ? response : blog,
      )
      setBlogs(sortBlogs(updatedBlogs))
      handleNotification(
        `Succesfully updated ${response.title} by ${response.author}`,
        'info',
      )
    } catch (error) {
      handleNotification(error.response.data, 'error')
    }
  }

  const handleNotification = (message, type) => {
    setNotification({ message: message, type: type })
    setTimeout(() => setNotification({}), 5000)
  }

  const handleNewBlog = async (data) => {
    try {
      const response = await blogService.create(data, user.token)
      setBlogs(blogs.concat(response))
      handleNotification(
        `Succesfully added ${response.title} by ${response.author}`,
        'info',
      )
    } catch (error) {
      handleNotification(error.response.data, 'error')
    }
    newBlogButton.current.toggleVisibility()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = { username: userValue, password: passwordValue }
    try {
      const response = await loginService.login(credentials)
      setUser(response)
      localStorage.setItem('currentUser', JSON.stringify(response))
      handleNotification('Succesfully logged in', 'info')
    } catch (error) {
      handleNotification(error.response.data, 'error')
    }
    setUserValue('')
    setPasswordValue('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <h2>Log in</h2>
        <Login
          user={userValue}
          setUser={setUserValue}
          password={passwordValue}
          setPassword={setPasswordValue}
          onSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>blogs</h2>
      <div>
        <p> {user.name} logged in</p>
        <button type="button" onClick={() => logOut()}>
          Log out
        </button>
      </div>
      <h2>Create new blog</h2>
      <Togglable buttonLabel="New Blog" reference={newBlogButton}>
        <NewBlog postBlog={handleNewBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          putBlog={handleUpdate}
          deleteBlog={handleDelete}
          userId={user.id}
        />
      ))}
    </div>
  )
}

export default App
