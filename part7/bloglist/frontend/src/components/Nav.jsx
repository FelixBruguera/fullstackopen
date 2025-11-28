import { memo } from 'react'
import NavItem from './NavItem'
import Button from './Button'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Nav = memo(function Nav() {
  const [user, userService] = useAuth()
  const navigate = useNavigate()
  return (
    <nav className="w-full flex items-center justify-between my-5">
      <Link
        to="/"
        className="font-bold text-lg lg:text-3xl text-white"
      >
        Bloglist
      </Link>
      {user.id ? (
        <>
          <div className="w-1/2 flex items-center justify-evenly">
            <NavItem url={'/'} title="Blogs" />
            <NavItem url={'/users'} title="Users" />
          </div>
          <div className="w-1/4 flex justify-between items-center">
            <p className="hidden lg:block text-text-primary">
              <span className="text-white font-bold">{user.name}</span>{' '}
              logged in
            </p>
            <Button
              type="button"
              style="light"
              className="!w-fit"
              onClick={() => {
                userService.logout()
                navigate('/')}}
            >
              Log out
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/4 flex justify-between items-center" />
          <div className="w-1/2 flex items-center justify-evenly" />
        </>
      )}
    </nav>
  )
})

export default Nav
