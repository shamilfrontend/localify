<template>
  <div />
</template>

<script>
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'AdminPage',

  mixins: [mixinDefaultProps],

  mounted() {
    if (this.$store.getters['auth/isAuth']) {
      this.$router.push('/projects')
    }
  }
}
</script>
