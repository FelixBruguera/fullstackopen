import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  return await axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => error)
}

const get = async (id) => {
  return await axios
    .get(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => error)
}

const create = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return await axios
    .post(baseUrl, data, config)
    .then(response => response.data)
    .catch(error => error)
}

const update = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return await axios
    .put(`${baseUrl}/${data.id}`, data, config)
    .then(response => response.data)
    .catch(error => error)
}

const remove = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return await axios
    .delete(`${baseUrl}/${data.id}`, config)
    .then(response => response.data)
    .catch(error => error)
}

export default { getAll, get, create, update, remove }
