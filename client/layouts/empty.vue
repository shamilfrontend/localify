<template>
  <div class="empty-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="scss" scoped>
.empty-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 4rem;
}
</style>
