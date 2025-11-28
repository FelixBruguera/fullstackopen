import useBlogMutation from '../hooks/useBlogMutation'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import Button from './Button'
import Comments from './Comments'
import BlogButton from './BlogButton'
import { useNavigate } from 'react-router'
import { ExternalLink, ThumbsUp, Trash } from 'lucide-react'
import Dialog from './Dialog'
import { useRef } from 'react'
import Confirm from './Confirm'
import Loading from './Loading'

const Blog = ({ userId }) => {
  const params = useParams()
  const blogMutation = useBlogMutation()
  const navigate = useNavigate()
  const [data, isLoading, error] = useBlog(params.id)
  const deleteDialog = useRef(null)
  const iconSize = 20

  const handleLike = () => {
    blogMutation.update.mutate(data)
  }
  const handleComment = (e) => {
    e.preventDefault()
    const requestData = { id: data.id, comment: e.target.comment.value }
    e.target.comment.value = ''
    blogMutation.comment.mutate(requestData)
  }

  if (isLoading) {
   return <Loading />
  }

  if (error) {
    return <p>Something went wrong</p>
  }
  return (
    <div className="py-5 w-full lg:w-1/2 max-w-250 lg:min-w-150 flex flex-col items-start gap-5">
      <Dialog reference={deleteDialog}>
        <Confirm title={data.title} onCancel={() => deleteDialog.current.close()} onConfirm={() => {
          blogMutation.remove.mutate(data)
          return navigate('/')
        }} />
      </Dialog>
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{data.title} </h1>
        <h3 className="text-text-secondary">{data.author}</h3>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 items-start md:items-center w-full justify-between">
        <div className="flex w-full items-center justify-start gap-4">
          <Button className="!w-fit !m-0 shrink-0">
            <a
              className="flex justify-evenly items-center gap-2 md:px-4"
              href={data.url}
              rel="noreferrer"
              target="_blank"
            >
              <ExternalLink size={iconSize}/>
              Read
            </a>
          </Button>
          <BlogButton onClick={handleLike}>
            <ThumbsUp size={iconSize} />
            Like
          </BlogButton>
          {userId === data.userInfo.id.toString() ? (
            <BlogButton onClick={() => deleteDialog.current.showModal()}>
              <Trash size={iconSize} />
              Delete
            </BlogButton>
          ) : null}
        </div>
        <div className="flex w-full items-center md:justify-end gap-5">
          <div className='h-full flex items-center gap-2 px-3 py-1 my-auto bg-accent text-text-primary rounded-lg'>
          <p className="text-sm">
            {data.likes} Likes
          </p>
          </div>
          <span className="flex items-center justify-evenly w-max gap-1 text-text-secondary">
            <p>Added by </p>
            <Link
              to={`/users/${data.userInfo.id}`}
              className="text-text-primary font-bold hover:text-white transition-all hover:underline"
            >
              {data.userInfo.name}
            </Link>
          </span>
        </div>
      </div>
      <Comments comments={data.comments} onSubmit={handleComment} />
    </div>
  )
}

export default Blog
