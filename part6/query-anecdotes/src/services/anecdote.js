import axios from 'axios'

const BASE_URL = "http://localhost:3001/anecdotes"

const getAll = () => axios.get(BASE_URL).then(response => response.data)

const post = (data) => axios.post(BASE_URL, data).then(response => response.data)

const update = (data) => axios.patch(`${BASE_URL}/${data.id}`, data).then(response => response.data)

export default { getAll, post, update }