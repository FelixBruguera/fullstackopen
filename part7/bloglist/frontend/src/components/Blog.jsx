import Togglable from './Togglable'
import useBlogMutation from '../hooks/useBlogMutation'
import useBlog from '../hooks/useBlog'
import { useParams, useNavigate } from 'react-router'

const Blog = ({ userId }) => {
  const params = useParams()
  const blogService = useBlogMutation()
  const [data, isLoading, error] = useBlog(params.id)
  const navigate = useNavigate()

  const handleLike = () => {
    const updatedBlog = { ...data, likes: data.likes + 1 }
    blogService.update.mutate(updatedBlog)
  }
  const handleDelete = () => {
    const confirmation = window.confirm(
      `Removing ${data.title} by ${data.author}, are you sure?`,
    )
    if (confirmation) {
      blogService.remove.mutate(data)
    }
  }
    if (isLoading) {
        return <p>Loading...</p>
    }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1 className="blog-title">{data.title} </h1>
        <h3 className="blog-author">{data.author}</h3>
      </div>
      <div>
          <a
            className="blog-url"
            href={data.url}
            rel="noreferrer"
            target="_blank"
          >
            {data.url}
          </a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="blog-likes">Likes: {data.likes}</p>
            <button
              className="blog-like"
              type="button"
              onClick={() => handleLike()}
            >
              Like
            </button>
          </div>
          {data.user ? <p>Added by {data.user.name}</p> : null}
          {userId === data.user?.id.toString() ? (
            <button
              className="blog-delete"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          ) : null}
      </div>
    </div>
  )
}

export default Blog
