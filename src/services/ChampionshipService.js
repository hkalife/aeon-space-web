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
  getChampionshipById (championshipId) {
    return apiClient.get(`/championships/${championshipId}`)
  },
  getByState (state) {
    return apiClient.get(`/championships/bystate/${state}`)
  }
}
