import { memo } from 'react'
import Togglable from './Togglable'
import useBlogMutation from '../hooks/useBlogMutation'

const Blog = memo(function Blog({ blog, userId }) {
  const blogService = useBlogMutation()
  console.log('Blog Render')

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update.mutate(updatedBlog)
  }
  const handleDelete = () => {
    const confirmation = window.confirm(
      `Removing ${blog.title} by ${blog.author}, are you sure?`,
    )
    if (confirmation) {
      blogService.remove.mutate(blog)
    }
  }

  return (
    <li className="blog" style={{ border: '1px solid black', padding: '5px' }}>
      <div style={{ display: 'flex' }}>
        <p className="blog-title">{blog.title} </p>
        <p className="blog-author">{blog.author}</p>
      </div>
      <Togglable buttonLabel="View Details">
        <div>
          <a
            className="blog-url"
            href={blog.url}
            rel="noreferrer"
            target="_blank"
          >
            {blog.url}
          </a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="blog-likes">Likes: {blog.likes}</p>
            <button
              className="blog-like"
              type="button"
              onClick={() => handleLike()}
            >
              Like
            </button>
          </div>
          {blog.user ? <p>{blog.user.name}</p> : null}
          {userId === blog.user?.id.toString() ? (
            <button
              className="blog-delete"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          ) : null}
        </div>
      </Togglable>
    </li>
  )
})

export default Blog
