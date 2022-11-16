<template>
  <div class="the-breadcrumbs">
    <span v-if="breadcrumbsList.length === 1" class="the-breadcrumbs__crumb">
      {{ breadcrumbsList[0].title }}
    </span>
    <template v-else>
      <nuxt-link
        v-for="route in breadcrumbsList"
        :key="route.path"
        :to="route.path"
        class="the-breadcrumbs__crumb"
        active-class="the-breadcrumbs__crumb_active"
        exact-active-class="the-breadcrumbs__crumb_exact-active"
      >
        {{ route.title }}

        <span class="the-breadcrumbs__divider q-icon-arrow-right" />
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',

  props: {
    breadcrumbsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.the-breadcrumbs {
  display: inline-grid;
  grid-auto-flow: column;
  align-items: baseline;
  max-width: 100%;

  &__divider {
    position: relative;
    top: 5px;
    margin-right: 8px;
    margin-left: 8px;
    font-size: 24px;
    color: rgba(var(--color-rgb-gray), 0.32);
  }

  &__crumb {
    overflow: hidden;
    font-size: 24px;
    font-weight: 800;
    line-height: 31px;
    color: var(--color-primary-black);
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;

    &_exact-active:not(:first-child) {
      font-size: 16px;
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-base);
      color: var(--color-primary-black);
      cursor: default;
    }

    &_active {
      color: var(--color-primary-blue);
    }

    &:last-child {
      .the-breadcrumbs__divider {
        display: none;
      }
    }
  }
}
</style>
