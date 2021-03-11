import RankingsService from '../../services/RankingsService.js'

export const state = {
  globalRanking: [],
  niacoyRanking: [],
  xeosorRanking: [],
  vaheanRanking: [],
  saxiosRanking: []
}

export const mutations = {
  SET_GLOBAL_RANKING (state, globalRanking) {
    state.globalRanking = globalRanking
  },
  SET_NIACOY_RANKING (state, niacoyRanking) {
    state.niacoyRanking = niacoyRanking
  },
  SET_XEOSOR_RANKING (state, xeosorRanking) {
    state.xeosorRanking = xeosorRanking
  },
  SET_VAHEAN_RANKING (state, vaheanRanking) {
    state.vaheanRanking = vaheanRanking
  },
  SET_SAXIOS_RANKING (state, saxiosRanking) {
    state.saxiosRanking = saxiosRanking
  }
}

export const actions = {
  async searchGlobalRanking ({ commit }) {
    return RankingsService.getGlobalRanking().then((response) => {
      commit('SET_GLOBAL_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  },
  async searchNiacoyRanking ({ commit }) {
    return RankingsService.getNiacoyRanking().then((response) => {
      commit('SET_NIACOY_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  },
  async searchXeosorRanking ({ commit }) {
    return RankingsService.getXeosorRanking().then((response) => {
      commit('SET_XEOSOR_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  },
  async searchVaheanRanking ({ commit }) {
    return RankingsService.getVaheanRanking().then((response) => {
      commit('SET_VAHEAN_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  },
  async searchSaxiosRanking ({ commit }) {
    return RankingsService.getSaxiosRanking().then((response) => {
      commit('SET_SAXIOS_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  }
}

export const getters = {
  getRankings: state => state.rankings
}
