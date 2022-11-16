<template>
  <footer class="admin-footer">
    <p>&copy; {{ year }} {{ appName }}</p>
  </footer>
</template>

<script>
const { APP_NAME } = require('../../../server/config')

export default {
  name: 'TheAdminFooter',

  data() {
    return {
      year: new Date().getFullYear(),
      appName: APP_NAME
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-footer {
  padding: 15px 0;
  text-align: center;
}
</style>
