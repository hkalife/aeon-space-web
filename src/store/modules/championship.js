import ChampionshipService from '../../services/ChampionshipService.js'

export const state = {
  currentChampionships: [],
  passedChampionships: [],
  championshipsWon: []
}

export const mutations = {
  SET_CURRENT_CHAMPIONSHIPS (state, currentChampionships) {
    state.currentChampionships = state.currentChampionships.concat(currentChampionships)
  },
  SET_PASSED_CHAMPIONSHIPS (state, passedChampionships) {
    state.passedChampionships = state.passedChampionships.concat(passedChampionships)
  },
  SET_CHAMPIONSHIPS_WON (state, championshipsWon) {
    state.championshipsWon = state.championshipsWon.concat(championshipsWon)
  }
}

export const actions = {
  async getSpecificChampionshipUsingId ({ commit }, championshipId, originForState) {
    return ChampionshipService.getChampionshipById(championshipId).then((response) => {
      console.log(originForState)
      if (originForState === 'current') {
        commit('SET_CURRENT_CHAMPIONSHIPS', response.data)
      } else if (originForState === 'passed') {
        commit('SET_PASSED_CHAMPIONSHIPS', response.data)
      } else {
        commit('SET_CHAMPIONSHIPS_WON', response.data)
      }
    }).catch(error => {
      throw error
    })
  },
  async getSpecificCurrentChampionshipUsingId ({ commit }, championshipId) {
    return ChampionshipService.getChampionshipById(championshipId).then((response) => {
      commit('SET_CURRENT_CHAMPIONSHIPS', response.data)
    }).catch(error => {
      throw error
    })
  }
}

export const getters = {
  getChampionshipsWon: state => state.championshipsWon,
  getCurrentChampionships: state => state.currentChampionships,
  getPassedChampionships: state => state.currentChampionships
}
