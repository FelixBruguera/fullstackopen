import { memo } from 'react'
import { Link } from 'react-router'

const Blog = memo(function Blog({ blog, userId }) {

  return (
    <li className="blog" style={{ border: '1px solid black', padding: '5px' }}>
      <div style={{ display: 'flex' }}>
        <Link to={`blogs/${blog.id}`} className="blog-title">{blog.title} </Link>
        <p className="blog-author">{blog.author}</p>
      </div>
    </li>
  )
})

export default Blog
