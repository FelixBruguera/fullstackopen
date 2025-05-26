import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  return await axios
    .post(baseUrl, credentials)
    .then((response) => response)
    .catch((error) => error)
}

export default { login }
