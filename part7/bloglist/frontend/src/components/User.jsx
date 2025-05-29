import useUser from '../hooks/useUser'
import { Link, useParams } from 'react-router'

const User = () => {
    const params = useParams()
    const [data, isLoading, error] = useUser(params.id)
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Something went wrong</p>
    }
    console.log([data, isLoading, error])
    return (
        <>
        <h1>{data.name}</h1>
        <p>Added blogs</p>
        <ul>
            {data.blogs.map(blog => {
                return (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default User