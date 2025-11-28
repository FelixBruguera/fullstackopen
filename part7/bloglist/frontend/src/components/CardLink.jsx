import { ThumbsUp } from 'lucide-react'
import { memo } from 'react'
import { Link } from 'react-router'

const CardLink = memo(function CardLink({ path, mainText, secondaryText, detail }) {
  return (
    <li
      className={`relative h-full w-3/10 min-w-75 md:min-w-85 max-w-110 px-5 py-6 border-1 border-border bg-transparent rounded-xl
    hover:bg-accent hover:border-blue-900 transition-colors`}
    >
      <div className="flex flex-col items-start">
        <Link
          to={path}
          className="text-xl font-bold w-full line-clamp-1 overflow-hidden text-ellipsis text-text-primary"
          title={mainText}
        >
          <span className="absolute inset-0"></span>
          {mainText}
        </Link>
        <p
          className="text-text-secondary"
        >
          {secondaryText}
        </p>
        {detail >= 0 ? (
          <div className="flex items-center gap-1 text-text-secondary text-sm">
          <p className='m-0 p-0'>
            {detail}
          </p>
            <ThumbsUp size={14}/>
        </div>
        ) : null}
      </div>
    </li>
  )
})

export default CardLink
