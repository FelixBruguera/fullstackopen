import useBlogMutation from '../hooks/useBlogMutation'
import Input from './Input'
import Button from './Button'

const NewBlog = ({ closeModal }) => {
  const blogService = useBlogMutation()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    e.target.reset()
    blogService.create.mutate(data)
    closeModal()
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex flex-col bg-slate-900 px-5 items-center lg:items-end justify-between rounded-xl border border-border w-full md:min-w-120 py-2 lg:py-6 gap-3 lg:gap-2"
    >
      <h2 className='text-text-primary text-xl text-center w-full mb-4 font-bold'>New Blog</h2>
      <Input id="title" type="text" name="title" labelText="Title" />
      <Input id="author" type="text" name="author" labelText="Author" />
      <Input id="url" type="text" name="url" labelText="Url" />
      <div className="flex items-center justify-between w-8/10 mx-auto mt-2">
        <Button style="light" type="button" className="!w-fit !m-0" onClick={() => closeModal()}>
          Close
        </Button>
        <Button style="dark" type="submit" className="!w-fit !m-0">
          Save
        </Button>
      </div>
    </form>
  )
}

export default NewBlog
