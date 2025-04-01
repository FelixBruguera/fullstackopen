import Togglable from "./Togglable"

const Blog = ({ blog }) => (
  <div style={{ border: '1px solid black', padding: '5px' }}>
    {blog.title} {blog.author}
    <Togglable buttonLabel='View Details'>
      <div>
        <a href={blog.url} target="_blank">{blog.url}</a>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <p>Likes: {blog.likes}</p>
          <button type="button">Like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </Togglable>
  </div>  
)

export default Blog