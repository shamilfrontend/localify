export default function({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    const condition =
      store.getters['auth/isAuth'] && !request.headers.common.Authorization

    if (condition) {
      const token = store.getters['auth/token']
      request.headers.common.Authorization = `Bearer ${token}`
    }

    return request
  })

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/signin')
        store.dispatch('auth/logout')
      }

      if (error.response.status === 500) {
        // eslint-disable-next-line no-console
        console.error('Server 500 error')
      }
    }
  })
}
