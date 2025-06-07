import useUser from '../hooks/useUser'
import { Link, useParams } from 'react-router'
import List from './List'
import CardLink from './CardLink'

const User = () => {
  const params = useParams()
  const [data, isLoading, error] = useUser(params.id)
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Something went wrong</p>
  }
  return (
    <section>
      <h1 className="font-bold text-3xl text-center">{data.name}</h1>
      <p className="text-center text-gray-700 text-md">Added blogs</p>
      <List label="added blogs">
        {data.blogs.map((blog) => (
          <CardLink
            key={blog.id}
            path={`/blogs/${blog.id}`}
            mainText={blog.title}
            secondaryText={blog.author}
          />
        ))}
      </List>
    </section>
  )
}

export default User
