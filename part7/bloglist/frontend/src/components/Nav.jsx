import { memo } from 'react'
import { NavLink } from 'react-router'

const Nav = memo(function Nav({ user, userService }) {
    return (
        <nav style={{ 'display': 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <NavLink to={'/'}>Blogs</NavLink>
            <NavLink to={'/users'}>Users</NavLink>
            <div style={{ 'display': 'flex', alignItems: 'center' }}>
                <p> {user.name} logged in</p>
                <button type="button" onClick={() => userService.logout()}>
                Log out
                </button>
            </div>
        </nav>
    )
})

export default Nav