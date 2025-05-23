import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.post(baseUrl, data, config)
  return request.data
}

const update = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  console.log(data)
  const request = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return request.data
}

const remove = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.delete(`${baseUrl}/${data.id}`, config)
  return request.data
}

export default { getAll, create, update, remove }
