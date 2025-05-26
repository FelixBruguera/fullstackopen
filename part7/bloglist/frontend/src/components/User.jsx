import useUser from '../hooks/useUser'
import { useParams } from 'react-router'

const User = () => {
    const params = useParams()
    const [data, isLoading, error] = useUser(params.id)
    if (isLoading) {
        return <p>Loading...</p>
    }
    console.log(data.blogs)
    return (
        <>
        <h1>{data.name}</h1>
        <p>Added blogs</p>
        <ul>
            {data.blogs.map(blog => {
                return (
                    <li key={blog.id}>{blog.title}</li>
                )
            })}
        </ul>
        </>
    )
}

export default User