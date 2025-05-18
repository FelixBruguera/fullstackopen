import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationsReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const anecdote = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        dispatch(addAnecdote(anecdote))
        dispatch(newNotification(`Successfully created ${anecdote}`, 5))
  }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div><input name='newAnecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm