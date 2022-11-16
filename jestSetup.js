import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

// eslint-disable-next-line import/default
import storeReal from './client/store/index.js'

Vue.config.productionTip = false

const createComponentMocks = ({
  store,
  router,
  mocks = {
    $router: {
      push: () => {}
    },
    $route: {},
    $axios: {
      $get: () => Promise.resolve(),
      $post: () => Promise.resolve()
    },
    $store: {
      dispatch: () => {}
    }
  },
  stubs = {},
  computed = {},
  ...params
} = {}) => {
  const localVue = createLocalVue()
  const options = {
    localVue,
    mocks,
    stubs,
    computed,
    ...params
  }

  if (store) {
    localVue.use(Vuex)
    if (store === true) {
      options.store = storeReal
    } else {
      const { state, getters, actions } = store
      options.store = new Vuex.Store({
        state,
        getters,
        actions
      })
    }
  }

  if (router) {
    options.stubs['nuxt-link'] = true
    options.stubs.nuxt = true
  }

  return options
}

global.mount = mount
global.shallowMount = shallowMount
global.createComponentMocks = createComponentMocks
