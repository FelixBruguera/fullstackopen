import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { useRef } from 'react'
import useBlogs from '../hooks/useBlogs'

const BlogList = ({ userId }) => {
    const newBlogButton = useRef('')
    const [data, isLoading, error] = useBlogs()

    if (isLoading) {
        return <p>Loading...</p>
    }
    const blogs = data.sort((a, b) => b.likes - a.likes)

    return (
        <>
            <h2>Create new blog</h2>
            <Togglable buttonLabel='New Blog' reference={newBlogButton}>
                <NewBlog togglable={newBlogButton} />
            </Togglable>
            <ul>
                {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} userId={userId} />
                ))}
            </ul>
        </>
    )
}

export default BlogList