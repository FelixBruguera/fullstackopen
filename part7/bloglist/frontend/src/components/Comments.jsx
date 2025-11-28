import Button from './Button'
import Comment from './Comment'
import Input from './Input'

const Comments = function Comments({ comments, onSubmit }) {
  return (
    <div className="w-full flex flex-col gap-2 h-1/3">
      <h2 className="font-bold text-xl text-text-primary">Comments</h2>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex items-center justify-between gap-5"
      >
        <Input type="text" name="comment" placeholder="Add a comment" inputClass="h-10" />
        <Button type="submit" style="dark" className="!w-1/5 !max-w-20">
          Send
        </Button>
      </form>
      <ul aria-label="comments" className="flex flex-col gap-3 my-3">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  )
}

export default Comments
