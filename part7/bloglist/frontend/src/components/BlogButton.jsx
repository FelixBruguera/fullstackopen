import Button from './Button'

const BlogButton = (props) => {
  return (
    <Button
      style="light"
      type="button"
      className="!w-fit !m-0 flex items-center justify-evenly gap-2 fill-text-primary shrink-0"
      onClick={() => props.onClick()}
    >
        {props.children}
    </Button>
  )
}

export default BlogButton
