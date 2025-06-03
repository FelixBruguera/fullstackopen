import axios from 'axios'

export const blogService = axios.create({
  baseURL: '/api/blogs',
})

export const userService = axios.create({
  baseURL: '/api/users',
})

export const loginService = axios.create({
  baseURL: '/api/login',
})
