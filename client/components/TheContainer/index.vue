<template>
  <div class="the-container" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheContainer',

  props: {
    isTable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return {
        'the-container_is_table': this.isTable
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.the-container {
  width: 100%;
  max-width: 1920px;
  margin-right: auto;
  margin-left: auto;

  &__scrollbar {
    padding-bottom: 32px;
  }

  &__inner {
    padding-right: 32px;
    padding-left: 32px;
  }

  &_is_table {
    max-width: 100%;

    .the-container__inner,
    /deep/ .the-container__scrollbar-view {
      display: flex;
      flex: 1;
    }
  }
}
</style>
