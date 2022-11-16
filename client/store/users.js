export const state = () => ({
  users: []
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await this.$axios.$get('/api/v1/users')
      commit('setUsers', users)
      return users
    } catch (e) {
      //
    }
  }
}
