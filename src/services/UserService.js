import axios from 'axios'

const urlSettings = {
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const apiClient = axios.create(urlSettings)

export default {
  postUser (userData) {
    return apiClient.post('/users', userData)
  }
}
