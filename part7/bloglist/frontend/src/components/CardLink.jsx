import { memo } from 'react'
import { Link } from 'react-router'

const CardLink = memo(function CardLink({ path, mainText, secondaryText }) {
  return (
    <li
      className={`relative h-full w-3/10 min-w-85 max-w-110 px-5 py-6 shadow-sm border-1 border-gray-300 bg-gray-100 rounded-xl group
    hover:bg-blue-900 hover:border-blue-900 transition-all`}
    >
      <div className="flex flex-col items-start">
        <Link
          to={path}
          className="text-xl font-bold w-full line-clamp-1 overflow-hidden text-ellipsis
        group-has-hover:text-white"
          title={mainText}
        >
          <span className="absolute inset-0"></span>
          {mainText}
        </Link>
        <p
          className="text-gray-600
        group-has-hover:text-gray-300"
        >
          {secondaryText}
        </p>
      </div>
    </li>
  )
})

export default CardLink
