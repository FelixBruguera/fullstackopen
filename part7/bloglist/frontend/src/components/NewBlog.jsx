import useBlogMutation from '../hooks/useBlogMutation'

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
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="title">Title: </label>
      <input id="title" type="text" name="title"></input>
      <label htmlFor="author">Author: </label>
      <input id="author" type="text" name="author"></input>
      <label htmlFor="url">Url: </label>
      <input id="url" type="text" name="url"></input>
      <button type="submit">Save</button>
    </form>
  )
}

export default NewBlog
