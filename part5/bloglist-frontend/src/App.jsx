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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const session = localStorage.getItem('currentUser')
    if (session) { setUser(JSON.parse(session)) }
  }, [])

  const logOut = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    handleNotification('Succesfully logged out', 'info')
  }

  const handleNotification = (message, type) => {
    setNotification({ message: message, type: type })
    setTimeout(() => setNotification({}), 5000)
  }

  const handleNewBlog = async (data) => {
    try {
      const response = await blogService.create(data, user.token)
      setBlogs(blogs.concat(response))
      handleNotification(`Succesfully added ${response.title} by ${response.author}`, 'info')
    }
    catch(error) {
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
      handleNotification('Succesfully loged in', 'info')
    }
    catch(error) {
      handleNotification(error.response.data, 'error')
    }
    setUserValue('')
    setPasswordValue('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type}/>
        <h2>Log in</h2>
        <Login
          userValue={userValue}
          setUser={setUserValue}
          passwordValue={passwordValue}
          setPassword={setPasswordValue}
          onSubmit={handleLogin}/>
      </div>
    )
  }
  return (
    <div>
      <Notification message={notification.message} type={notification.type}/>
      <h2>blogs</h2>
      <div>
        <p> <b>{user.name}</b> logged in</p>
        <button type="button" onClick={() => logOut()}>Log out</button>
      </div>
      <h2>Create new blog</h2>
      <Togglable buttonLabel='New Blog' reference={newBlogButton}> 
        <NewBlog 
          postBlog={handleNewBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App