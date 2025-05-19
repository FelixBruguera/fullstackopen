import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdote"
import { useContext } from "react"
import { NotificationContext } from "./NotificationContextProvider"

const AnecdoteForm = () => {
  const [notification, setNotification] = useContext(NotificationContext)
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: anecdoteService.post,
    onSuccess: (data) => {
      setNotification(`Succesfully added ${data.content}`)
      client.setQueryData(["anecdotes"], (old) => old.concat(data))
    },
    onError: (error) => {
      setNotification(`ERROR: ${error.response.data.error}`)
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
        <input name='anecdote'/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
