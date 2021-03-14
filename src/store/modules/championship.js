import ChampionshipService from '../../services/ChampionshipService.js'

export const state = {
  currentChampionships: [],
  passedChampionships: [],
  championshipsWon: [],
  allCurrent: [],
  allPassed: []
}

export const mutations = {
  SET_CURRENT_CHAMPIONSHIPS (state, currentChampionships) {
    state.currentChampionships = state.currentChampionships.concat(currentChampionships)
  },
  SET_CURRENT_CHAMPIONSHIPS_UNSUBSCRIBE (state, currentChampionships) {
    state.currentChampionships = currentChampionships
  },
  SET_PASSED_CHAMPIONSHIPS (state, passedChampionships) {
    state.passedChampionships = state.passedChampionships.concat(passedChampionships)
  },
  SET_CHAMPIONSHIPS_WON (state, championshipsWon) {
    state.championshipsWon = state.championshipsWon.concat(championshipsWon)
  },
  SET_ALL_CURRENT (state, allCurrent) {
    state.allCurrent = allCurrent
  },
  SET_ALL_PASSED (state, allPassed) {
    state.allPassed = allPassed
  }
}

export const actions = {
  async searchByState ({ commit }, state) {
    return ChampionshipService.getByState(state).then((response) => {
      if (state === 'current') {
        commit('SET_ALL_CURRENT', response.data)
      } else if (state === 'passed') {
        commit('SET_ALL_PASSED', response.data)
      }
    }).catch(error => {
      throw error
    })
  },
  async subscribe ({ commit }, paramsToSubscribe) {
    const championshipToDetail = paramsToSubscribe.get('championship')
    const userToSubscribe = paramsToSubscribe.get('user')
    return ChampionshipService.putSubscribe(userToSubscribe, championshipToDetail).then((response) => {
      commit('SET_CURRENT_CHAMPIONSHIPS', response.data)
    }).catch(error => {
      throw error
    })
  },
  async unsubscribe ({ commit }, paramsToUnsubscribe) {
    const championshipToDetail = paramsToUnsubscribe.get('championship')
    const userToUnsubscribe = paramsToUnsubscribe.get('user')
    return ChampionshipService.putUnsubscribe(userToUnsubscribe, championshipToDetail).then((response) => {
      const currentChampionshipsForUnsubscribePayload = state.currentChampionships
      let index = 0
      for (const championship of currentChampionshipsForUnsubscribePayload) {
        if (championship.id === response.data.id) {
          currentChampionshipsForUnsubscribePayload.splice(index, 1)
        }
        index++
      }
      commit('SET_CURRENT_CHAMPIONSHIPS_UNSUBSCRIBE', currentChampionshipsForUnsubscribePayload)
    }).catch(error => {
      throw error
    })
  },
  async getSpecificChampionshipUsingId ({ commit }, championshipId, originForState) {
    return ChampionshipService.getChampionshipById(championshipId).then((response) => {
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
