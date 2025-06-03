import useBlogMutation from '../hooks/useBlogMutation'
import Input from './Input'
import Button from './Button'

const NewBlog = ({ togglable }) => {
  const blogService = useBlogMutation()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    blogService.create.mutate(data)
    togglable.current.toggleVisibility()
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex flex-col lg:flex-row items-center lg:items-end justify-between w-9/10 py-2 lg:py-5 gap-3 lg:gap-1"
    >
      <Input id="title" type="text" name="title" labelText="Title" />
      <Input id="author" type="text" name="author" labelText="Author" />
      <Input id="url" type="text" name="url" labelText="Url" />
      <Button style="dark" type="submit" width="w-fit" margin="0">
        Save
      </Button>
    </form>
  )
}

export default NewBlog
