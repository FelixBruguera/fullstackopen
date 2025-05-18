import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(baseUrl)

const post = (content) => axios.post(baseUrl, {content: content, votes: 0})

const patch = (content) => axios.patch(`${baseUrl}/${content.id}`, content)

export default { getAll, post, patch }