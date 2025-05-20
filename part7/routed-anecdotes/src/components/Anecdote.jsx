const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>Has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote