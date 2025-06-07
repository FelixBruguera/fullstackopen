import Button from './Button'

const BlogButton = (props) => {
  return (
    <Button
      style="light"
      type="button"
      width="w-2/11"
      margin="0"
      onClick={() => props.onClick()}
    >
      <span className="flex items-center justify-evenly fill-gray-400 hover:fill-gray-300">
        {props.children}
      </span>
    </Button>
  )
}

export default BlogButton
