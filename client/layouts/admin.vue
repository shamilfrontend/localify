<template>
  <div class="default-layout">
    <div class="default-layout__aside">
      <the-side-bar />
    </div>

    <div class="default-layout__content">
      <div class="default-layout__inner">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import TheSideBar from '@/components/TheSideBar'

export default {
  name: 'AdminLayout',

  components: {
    TheSideBar
  },

  created() {
    this.$store.dispatch('auth/getCurrentUser').catch(() => {
      this.logout()
      this.$router.push('/signin')
    })
    this.getLanguages()
  },

  methods: {
    ...mapActions('languages', ['getLanguages']),
    ...mapActions('auth', ['logout']),
    ...mapMutations('auth', ['setUser'])
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: grid;
  min-width: 1170px;
  min-height: 100vh;
  grid-template-columns: auto 1fr;

  &__aside {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 100%;
    max-height: 100vh;
  }

  &__content,
  &__inner {
    height: 100%;
  }

  &__content {
    width: 100%;
    min-width: 100%;
  }
}
</style>
