import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const anecdote = e.target.newAnecdote.value
        e.target.newAnecdote.value = ""
        dispatch(add(anecdote))
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