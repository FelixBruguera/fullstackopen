import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from "./services/anecdote"

const App = () => {
  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (data) => {
      client.setQueryData(["anecdotes"], (old) => old.map(anecdote => anecdote.id === data.id ? data : anecdote))
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
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
