import RankingsService from '../../services/RankingsService.js'

export const state = {
  globalRanking: []
}

export const mutations = {
  SET_GLOBAL_RANKING (state, globalRanking) {
    state.globalRanking = globalRanking
  }
}

export const actions = {
  async searchGlobalRanking ({ commit }) {
    return RankingsService.getGlobalRanking().then((response) => {
      commit('SET_GLOBAL_RANKING', response.data)
    }).catch(error => {
      throw error
    })
  }
}

export const getters = {
  getRankings: state => state.rankings
}
