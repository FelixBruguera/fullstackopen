import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdote"

const AnecdoteForm = () => {
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: anecdoteService.post,
    onSuccess: (data) => {
      client.setQueryData(["anecdotes"], (old) => old.concat(data))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate({content: content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' minLength={5}/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
