const Comment = ({ comment }) => {
  return (
    <li
      key={comment.id}
      className="py-3 px-3 text-md border-1 border-border rounded-xl text-text-primary
        hover:border-slate-700 transition-colors"
    >
      {comment.content}
    </li>
  )
}

export default Comment
