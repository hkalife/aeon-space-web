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
  getGlobalRanking () {
    return apiClient.get('/rankings/global')
  },
  getNiacoyRanking () {
    return apiClient.get('/rankings/niacoy')
  },
  getXeosorRanking () {
    return apiClient.get('/rankings/xeosor')
  },
  getVaheanRanking () {
    return apiClient.get('/rankings/vahean')
  },
  getSaxiosRanking () {
    return apiClient.get('/rankings/saxios')
  },
  getRankingForChampionship (id) {
    console.log('ma oeeeeee')
    return apiClient.get(`/championships/ranking/${id}`)
  }
}
