import Togglable from './Togglable'
import NewBlog from './NewBlog'
import CardLink from './CardLink'
import List from './List'
import { useRef } from 'react'
import useBlogs from '../hooks/useBlogs'

const BlogList = () => {
  const newBlogButton = useRef('')
  const [data, isLoading, error] = useBlogs()

  if (isLoading) {
    return <p>Loading...</p>
  }
  const blogs = data.sort((a, b) => b.likes - a.likes)

  return (
    <section>
      <Togglable buttonLabel="New Blog" reference={newBlogButton}>
        <NewBlog togglable={newBlogButton} />
      </Togglable>
      <List label="blogs">
        {blogs.map((blog) => (
          <CardLink
            key={blog.id}
            path={`blogs/${blog.id}`}
            mainText={blog.title}
            secondaryText={blog.author}
          />
        ))}
      </List>
    </section>
  )
}

export default BlogList
