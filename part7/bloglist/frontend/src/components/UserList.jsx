import useUsers from '../hooks/useUsers'
import CardLink from './CardLink'
import List from './List'
import Loading from './Loading'

const UserList = () => {
  const [data, isLoading, error] = useUsers()

  if (isLoading) {
   return <Loading />
  }
  if (error) {
    return <p>Something went wrong</p>
  }

  const users = data.sort((a, b) => b.blogs.length - a.blogs.length)
  return (
    <section>
      <List label="users">
        {users.map((user) => (
          <CardLink
            key={user.id}
            path={`./${user.id}`}
            mainText={user.name}
            secondaryText={`${user.blogs} Added blogs`}
          />
        ))}
      </List>
    </section>
  )
}

export default UserList
