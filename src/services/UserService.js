import axios from 'axios'

const urlSettings = {
  baseURL: 'http://aeon-space-backend.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const apiClient = axios.create(urlSettings)

export default {
  getUserByEmail (userMail) {
    return apiClient.get(`/users/getByEmail/${userMail}`)
  },
  postUser (userData) {
    return apiClient.post('/users', userData)
  },
  putUser (userData) {
    return apiClient.put(`/users/${userData.id}`, userData)
  }
}
