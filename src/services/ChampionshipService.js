import axios from 'axios'

const urlSettings = {
  baseURL: 'https://aeon-space-backend.herokuapp.com/',
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
  },
  putSubscribe (userToSubscribe, championshipToDetail) {
    return apiClient.put(`/championships/subscribe/${championshipToDetail.id}`, userToSubscribe)
  },
  putUnsubscribe (userToUnsubscribe, championshipToDetail) {
    return apiClient.put(`/championships/unsubscribe/${championshipToDetail.id}`, userToUnsubscribe)
  }
}
