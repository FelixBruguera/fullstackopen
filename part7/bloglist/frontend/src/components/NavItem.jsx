import { NavLink } from 'react-router'

const NavItem = ({ url, title }) => {
  return (
    <NavLink
      to={url}
      className={({
        isActive,
      }) => `py-2 px-5 text-sm lg:text-base border-1 border-border rounded-xl shadow-sm font-medium
        hover:bg-accent text-text-primary
        transition-colors 
        ${isActive ? 'bg-accent' : null}`}
    >
      {title}
    </NavLink>
  )
}

export default NavItem
