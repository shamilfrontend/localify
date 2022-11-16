<template>
  <div class="sidebar" :class="sidebarClasses">
    <div class="sidebar__scroll">
      <div class="sidebar__inner">
        <nuxt-link to="/" class="sidebar-logo">
          localify
        </nuxt-link>

        <side-bar-item
          :is-collapsed="isCollapsed"
          title="Профиль"
          :subtitle="currentUser.email"
          path="/profile"
          icon="el-icon-user-solid"
        />

        <div class="sidebar__divider" />

        <side-bar-item
          v-for="(menuItem, index) in menuByRole"
          :key="index"
          :is-collapsed="isCollapsed"
          :title="menuItem.label"
          :path="menuItem.path"
          :icon="menuItem.icon"
          :exact="menuItem.exact"
        />

        <div class="sidebar__divider sidebar__divider_auto" />

        <side-bar-item
          type="button"
          icon="el-icon-switch-button"
          title="Выход"
          :is-collapsed="isCollapsed"
          @click="handleLogoutBtnClick"
        />
      </div>
    </div>

    <button class="sidebar__toggler" @click="handleTogglerClick">
      <span class="el-icon-caret-right" />
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import SideBarItem from './SideBarItem'

const LS_COLLAPSED_KEY = 'is_sidebar_collapsed'

export default {
  name: 'TheSideBar',

  components: {
    SideBarItem
  },

  data() {
    return {
      isCollapsed: false
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),

    menuByRole() {
      return [
        {
          label: 'Проекты',
          path: '/projects',
          icon: 'el-icon-menu',
          exact: false,
          isShow: true
        }
        // {
        //   label: 'how-use',
        //   path: '/how-use',
        //   icon: 'q-icon-comment',
        //   exact: false,
        //   isShow: true
        // },
        // {
        //   label: 'support',
        //   path: '/support',
        //   icon: 'el-icon-s-help',
        //   exact: false,
        //   isShow: true
        // }
      ].filter(({ isShow }) => isShow)
    },

    sidebarClasses() {
      return {
        sidebar_collapsed: this.isCollapsed
      }
    }
  },

  beforeMount() {
    const isCollapsed = Boolean(Number(localStorage.getItem(LS_COLLAPSED_KEY)))
    if (isCollapsed) this.isCollapsed = isCollapsed
  },

  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogoutBtnClick() {
      try {
        await this.$axios.$post('/api/v1/users/logout')
        await this.logout()
        this.$router.push('/')
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при выхода'
        })
      }
    },

    handleTogglerClick() {
      const newValue = !this.isCollapsed
      localStorage.setItem(LS_COLLAPSED_KEY, newValue ? 1 : 0)
      this.isCollapsed = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 248px;
  height: 100%;
  background-image: linear-gradient(
    188deg,
    var(--color-primary-blue),
    var(--color-primary-blue) 115.25%
  );
  transition: width ease-in 0.25s;

  &_collapsed {
    width: 104px;
  }

  &__scroll {
    height: 100%;
    overflow-y: auto;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-top: 32px;
    padding-bottom: 40px;
  }

  &__divider {
    min-height: 32px;

    &_auto {
      flex: 1;
    }
  }

  &__toggler {
    position: absolute;
    top: 34px;
    right: -13px;
    width: 28px;
    height: 28px;
    padding: 0;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border: 0;
    border-radius: 50%;
    outline: none;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.24);
    transition: transform 0.25s ease;
    transform: rotate(-180deg);

    & .q-icon-triangle-right {
      font-size: 24px;
      line-height: 28px;
      color: var(--color-primary-blue);
    }

    .sidebar_collapsed & {
      transform: rotate(0);
    }
  }
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding-right: 36px;
  padding-left: 36px;
  margin-bottom: 42px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
}
</style>
