import useUser from '../hooks/useUser'
import { Link, useParams } from 'react-router'
import List from './List'
import CardLink from './CardLink'
import Loading from './Loading'

const User = () => {
  const params = useParams()
  const [data, isLoading, error] = useUser(params.id)
  if (isLoading) {
   return <Loading />
  }
  if (error) {
    return <p>Something went wrong</p>
  }
  return (
    <section>
      <h1 className="font-bold text-3xl text-center text-text-primary">{data.name}</h1>
      {data.blogs && (<p className="text-center text-text-secondary">{data.blogs.length} Added blogs</p>)}
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
