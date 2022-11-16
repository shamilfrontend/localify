export const state = () => ({
  languages: []
})

export const mutations = {
  setLanguages(state, languages) {
    state.languages = languages
  }
}

export const actions = {
  getLanguages({ commit }) {
    return this.$axios.$get('/api/v1/languages').then((languages) => {
      commit('setLanguages', languages)
      return languages
    })
  }
}
