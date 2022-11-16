export default function({ store, redirect }) {
  store.dispatch('auth/getCurrentUser').catch(() => {
    store.dispatch('auth/logout')
  })

  if (!store.getters['auth/isAuth']) {
    redirect('/signin')
  }
}
