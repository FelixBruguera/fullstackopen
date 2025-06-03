import { memo } from 'react'
import NavItem from './NavItem'
import Button from './Button'

const Nav = memo(function Nav({ user, userService }) {
  return (
    <nav className="w-full flex items-center justify-between py-5">
      <h1 className="font-bold text-lg lg:text-3xl text-blue-900 underline">Blog list</h1>
      <div className="w-1/2 flex items-center justify-evenly">
        <NavItem url={'/'} title="Blogs" />
        <NavItem url={'/users'} title="Users" />
      </div>
      {user.id ? (
        <div className="w-1/4 flex justify-between items-center">
          <p className='hidden lg:block'>
            <span className="text-blue-900 font-bold">{user.name}</span> logged
            in
          </p>
          <Button
            type="button"
            style="light"
            width="min"
            onClick={() => userService.logout()}
          >
            Log out
          </Button>
        </div>
      ) : (
        <div className="w-1/4 flex justify-between items-center" />
      )}
    </nav>
  )
})

export default Nav
