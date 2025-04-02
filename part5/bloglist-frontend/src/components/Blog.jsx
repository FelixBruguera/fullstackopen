import Togglable from './Togglable'

const Blog = ({ blog, putBlog, deleteBlog }) => {

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    putBlog(updatedBlog)
  }
  const handleDelete = () => {
    const confirmation = window.confirm(`Removing ${blog.title} by ${blog.author}, are you sure?`)
    if (confirmation) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={{ border: '1px solid black', padding: '5px' }}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='View Details'>
        <div>
          <a href={blog.url} rel='noreferrer' target="_blank">{blog.url}</a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>Likes: {blog.likes}</p>
            <button type="button" onClick={() => handleLike()}>Like</button>
          </div>
          <p>{blog.author}</p>
          <button type="button" onClick={() => handleDelete()}>Delete</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog