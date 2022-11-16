import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import { isValidToken } from '@/common/helpers'

export const state = () => ({
  token: null,
  currentUser: {
    name: '',
    color: '#485d74'
  }
})

export const getters = {
  isAuth: (state) => Boolean(state.token),
  token: (state) => state.token
}

export const mutations = {
  setUser: (state, user) => (state.currentUser = user),
  setToken: (state, token) => (state.token = token),
  clearToken: (state) => (state.token = null)
}

export const actions = {
  signIn({ commit, dispatch }, formData) {
    return this.$axios.$post('/api/v1/users', formData).then((response) => {
      dispatch('setToken', response.token)
      commit('setUser', response)
      return response
    })
  },

  setToken({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    JsCookie.set('jwt-token', token)
  },

  logout({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    JsCookie.remove('jwt-token')
  },

  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isValidToken(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },

  getCurrentUser({ commit, dispatch }) {
    this.$axios
      .$get('/api/v1/users/self')
      .then((response) => {
        commit('setUser', response)
      })
      .catch(() => {
        dispatch('logout')
      })
  }
}
