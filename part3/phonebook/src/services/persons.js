import axios from 'axios'

const baseUrl = '/api/persons'

const handleResponse = (response) => response.data

const getAll = () => axios.get(baseUrl).then(handleResponse)

const get = (id) => axios.get(baseUrl+`/${id}`).then(handleResponse)

const add = (data) => axios.post(baseUrl, data).then(handleResponse)

const deletePerson = (id) => axios.delete(baseUrl+`/${id}`).then(handleResponse)

const update = (id, data) => axios.put(baseUrl+`/${id}`, data).then(handleResponse)

export default {getAll, get, add, deletePerson, update}