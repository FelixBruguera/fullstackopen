import { useSelector, useDispatch } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))
    const vote = (id) => {
        console.log('vote', id)
        dispatch(updateVotes(id))
    }
    return (
        <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default AnecdoteList