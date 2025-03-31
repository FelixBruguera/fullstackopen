import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = await axios.post(baseUrl, data, config)
  return request.data
}

export default { getAll, create }