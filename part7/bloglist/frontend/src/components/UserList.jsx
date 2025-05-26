import useUsers from '../hooks/useUsers'
import { Link } from 'react-router'

const UserList = () => {
    const [data, isLoading, error] = useUsers()

    if (isLoading) {
        return <p>Loading...</p>
    }
    const users = data.sort((a, b) => b.blogs.length - a.blogs.length)
    console.log(data)
    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Blogs created</th>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.id}>
                        <td><Link to={`./${user.id}`}>{ user.name }</Link></td>
                        <td>{ user.blogs.length }</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}

export default UserList