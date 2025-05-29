import useBlogMutation from '../hooks/useBlogMutation'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router'
import { Link } from 'react-router'

const Blog = ({ userId }) => {
  const params = useParams()
  const blogMutation = useBlogMutation()
  const [data, isLoading, error] = useBlog(params.id)

  const handleLike = () => {
    const updatedBlog = { ...data, likes: data.likes + 1 }
    blogMutation.update.mutate(updatedBlog)
  }
  const handleDelete = () => {
    const confirmation = window.confirm(
      `Removing ${data.title} by ${data.author}, are you sure?`,
    )
    if (confirmation) {
      blogMutation.remove.mutate(data)
    }
  }
  const handleComment = (e) => {
    e.preventDefault()
    const comment = { comment: e.target.comment.value, id: data.id }
    e.target.comment.value = ''
    blogMutation.comment.mutate(comment)
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
          {data.user
            ?<span>
                <p>Added by </p> <Link to={`/users/${data.user.id}`}>{data.user.name}</Link>
              </span>
            : null}
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
      <div>
        <h2>Comments</h2>
        <form onSubmit={(e) => handleComment(e)}>
          <input type="text" name="comment" placeholder='Add a comment' />
          <button type="submit">Send</button>
        </form>
        <ul>
          {data.comments.map(comment => {
            return ( <li key={comment.id}>{comment.content}</li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
