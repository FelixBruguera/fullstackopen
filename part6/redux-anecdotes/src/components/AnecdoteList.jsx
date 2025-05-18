import { useSelector, useDispatch } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationsReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdote, filter }) => {
        const filteredAnecdotes = anecdote.filter(anecdote => anecdote.content.includes(filter))
        return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
    })
    return (
        <ul>
{            console.log("render")}
            {anecdotes.map(anecdote =>
                <li key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            dispatch(updateAnecdote(anecdote))
                            dispatch(newNotification(`Voted for ${anecdote.content}`, 5))
                            }
                        }>vote</button>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default AnecdoteList