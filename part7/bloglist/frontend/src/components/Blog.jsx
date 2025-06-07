import useBlogMutation from '../hooks/useBlogMutation'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import Button from './Button'
import Comments from './Comments'
import BlogButton from './BlogButton'
import { useNavigate } from 'react-router'

const Blog = ({ userId }) => {
  const params = useParams()
  const blogMutation = useBlogMutation()
  const navigate = useNavigate()
  const [data, isLoading, error] = useBlog(params.id)

  const handleLike = () => {
    blogMutation.update.mutate(data)
  }
  const handleDelete = () => {
    const confirmation = window.confirm(
      `Removing ${data.title} by ${data.author}, are you sure?`,
    )
    if (confirmation) {
      blogMutation.remove.mutate(data)
      return navigate('/')
    }
  }
  const handleComment = (e) => {
    e.preventDefault()
    const requestData = { id: data.id, comment: e.target.comment.value }
    e.target.comment.value = ''
    blogMutation.comment.mutate(requestData)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <div className="py-5 w-full lg:w-1/2 flex flex-col items-start gap-5">
      <div>
        <h1 className="text-3xl font-bold">{data.title} </h1>
        <h3 className="text-gray-700">{data.author}</h3>
      </div>
      <div className="flex w-full items-center justify-between">
        <Button width="w-1/4" margin="0">
          <a
            className="flex w-full justify-evenly items-center"
            href={data.url}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#CCCCCC"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
            </svg>
            Read
          </a>
        </Button>
        <div className="flex w-3/4 items-center justify-end gap-5">
          <p className="h-full px-3 py-1 my-auto bg-gray-200 rounded-lg">
            {data.likes} Likes
          </p>
          <span className="flex items-center justify-evenly w-max gap-1 ">
            <p>Added by </p>
            <Link
              to={`/users/${data.userInfo.id}`}
              className="text-blue-900 font-bold"
            >
              {data.userInfo.name}
            </Link>
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-10">
        <BlogButton onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
          </svg>
          Like
        </BlogButton>
        {userId === data.userInfo.id.toString() ? (
          <BlogButton onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
            Delete
          </BlogButton>
        ) : null}
      </div>
      <Comments comments={data.comments} onSubmit={handleComment} />
    </div>
  )
}

export default Blog
