<template>
  <div class="page-wrap">
    <div class="page-wrap__header" :class="headerClasses" :style="headerStyles">
      <div class="page-wrap__breadcrumbs">
        <the-breadcrumbs :breadcrumbs-list="breadcrumbsList" />
      </div>

      <div v-if="$slots['header-actions']">
        <slot name="header-actions" />
      </div>
    </div>

    <div class="page-wrap__body">
      <slot />
    </div>
  </div>
</template>

<script>
import TheBreadcrumbs from '@/components/TheBreadcrumbs'

export default {
  name: 'QPageWrap',

  components: {
    TheBreadcrumbs
  },

  props: {
    breadcrumbsList: {
      type: Array,
      default: () => []
    },
    statusColor: {
      type: String,
      default: null
    }
  },

  computed: {
    headerClasses() {
      return {
        'page-wrap__header_has-status': this.statusColor
      }
    },

    headerStyles() {
      return {
        'border-bottom-color': this.statusColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 32px;

    &_has-status {
      margin-bottom: 32px;
      border-bottom-style: solid;
      border-bottom-width: 4px;
    }
  }

  &__breadcrumbs {
    padding-top: 4px;
    padding-bottom: 5px;
  }

  &__body {
    flex: 1;
    padding-right: 32px;
    padding-bottom: 48px;
    padding-left: 32px;
  }
}
</style>
