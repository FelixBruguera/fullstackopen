import axios from 'axios'

const base_url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => axios.get(base_url).then(response => response.data)

export default {getAll}