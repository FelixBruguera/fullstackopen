import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import { useContext } from "react"
import { NotificationContext } from "./components/NotificationContextProvider"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from "./services/anecdote"

const App = () => {
  const client = useQueryClient()
  const [notification, setNotification] = useContext(NotificationContext)

  const mutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (data) => {
      client.setQueryData(["anecdotes"], (old) => old.map(anecdote => anecdote.id === data.id ? data : anecdote))
      setNotification(`Vote added for ${data.content}`)
    }
  })

  const handleVote = (anecdote) => {
    mutation.mutate({...anecdote, votes: anecdote.votes +1})
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: 3
  })

  if (isPending) {
    return (
      <p>Loading data...</p>
    )
  }
  if (isError) {
    return (
      <p>Something went wrong: {error.message}</p>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {data.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
        )
      }
    </div>
  )
}

export default App
