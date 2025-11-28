import NewBlog from './NewBlog'
import CardLink from './CardLink'
import List from './List'
import { useRef } from 'react'
import useBlogs from '../hooks/useBlogs'
import Dialog from './Dialog'
import Button from './Button'
import Loading from './Loading'

const BlogList = () => {
  const [data, isLoading, error] = useBlogs()
  const newBlogRef = useRef(null)

  if (isLoading) {
   return <Loading />
  }
  if (error) {
    return <p>Something went wrong</p>
  }
  const blogs = data.sort((a, b) => b.likes - a.likes)

  return (
    <section className='h-19/20 w-full'>
      <Dialog reference={newBlogRef}>
        <NewBlog closeModal={() => newBlogRef.current.close()}/>
      </Dialog>
      <Button className="!w-fit" onClick={() => newBlogRef.current.showModal()}>New Blog</Button>
      <List label="blogs">
        {blogs.map((blog) => (
          <CardLink
            key={blog.id}
            path={`blogs/${blog.id}`}
            mainText={blog.title}
            secondaryText={blog.author}
            detail={blog.likes}
          />
        ))}
      </List>
    </section>
  )
}

export default BlogList
