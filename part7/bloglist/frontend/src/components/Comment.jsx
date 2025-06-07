const Comment = ({ comment }) => {
  return (
    <li
      key={comment.id}
      className="py-3 px-3 text-md border-1 border-gray-300 rounded-xl
        hover:border-blue-900 transition-all"
    >
      {comment.content}
    </li>
  )
}

export default Comment
