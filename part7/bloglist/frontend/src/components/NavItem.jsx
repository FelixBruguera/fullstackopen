import { NavLink } from 'react-router'

const NavItem = ({ url, title }) => {
  return (
    <NavLink
      to={url}
      className={({
        isActive,
      }) => `py-2 lg:py-3 px-5 w-20 text-sm lg:text-base border-1 rounded-xl border-gray-200 shadow-sm font-medium
        hover:bg-blue-900 hover:text-white
        transition-all 
        ${isActive ? 'bg-gray-200' : null}`}
    >
      {title}
    </NavLink>
  )
}

export default NavItem
