import useUsers from '../hooks/useUsers'
import CardLink from './CardLink'
import List from './List'

const UserList = () => {
  const [data, isLoading, error] = useUsers()

  if (isLoading) {
    return <p>Loading...</p>
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
