import UserService from '../../services/UserService.js'

export const state = {
  user: {}
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  async createUser ({ commit }, user) {
    return UserService.postUser(user).then((response) => {
      commit('SET_USER', response.data)
    }).catch(error => {
      throw error
    })
  }
}

export const getters = {
  getUser: state => state.user
}
