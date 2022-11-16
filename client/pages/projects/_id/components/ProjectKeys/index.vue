<template>
  <div class="project-keys">
    <div v-if="!isTranslator" class="project-keys__actions">
      <el-input
        v-model="searchValue"
        class="project-keys__search"
        type="search"
        placeholder="Поиск ключей..."
        size="small"
      />

      <create-keys-modal />
    </div>

    <div v-if="keys.length">
      <div class="project-actions">
        <div v-if="isOwner || isManager" class="project-actions__left">
          <el-checkbox
            v-model="isSelectedAll"
            class="project-actions__select-all"
            @change="handleSelectAllKeysToggle"
          >
            Выбрать все
          </el-checkbox>

          <button
            v-if="!isDisabledActions"
            class="delete-all-keys"
            :disabled="isDisabledActions"
            @click="handleDeleteAllKeysBtnClick"
          >
            Удалить
          </button>
        </div>

        <div class="project-actions__right" :class="actionRightClasses">
          <el-button
            v-if="isDeveloper || isTranslator"
            class="project-actions__logout"
            type="danger"
            size="small"
            @click="handleLogoutBtnClick"
          >
            Выйти из проекта
          </el-button>
        </div>
      </div>

      <div v-for="key in filteredKeys" :key="key.id">
        <project-key
          :key-data="key"
          :languages="languages"
          :selected-keys="selectedKeys"
          @toggle-key="handleAddToSelected"
        />
      </div>
    </div>
    <p v-else>Ключей нет</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mixinRoleLogic from '../../mixins/roleLogic'

import CreateKeysModal from './CreateKeysModal'
import ProjectKey from './ProjectKey'

export default {
  name: 'ProjectKeys',

  components: {
    CreateKeysModal,
    ProjectKey
  },

  mixins: [mixinRoleLogic],

  props: {
    searchValue: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isSelectedAll: false,
      selectedKeys: []
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('projects', {
      projectId: (state) => state.openedProject.id,
      keys: (state) => state.openedProject.keys,
      languages: (state) => state.openedProject.languages,
      members: (state) => state.openedProject.members
    }),

    filteredKeys() {
      return this.keys.filter((key) => key.name.includes(this.searchValue))
    },

    isDisabledActions() {
      return this.selectedKeys.length === 0
    },

    actionRightClasses() {
      return {
        'project-actions__right_full': this.isTranslator || this.isDeveloper
      }
    }
  },

  watch: {
    selectedKeys() {
      this.isSelectedAll = this.selectedKeys.length === this.keys.length
    }
  },

  methods: {
    ...mapActions('projects', ['removeKeys']),

    handleSelectAllKeysToggle() {
      this.selectedKeys = this.isSelectedAll
        ? this.keys.map(({ id }) => id)
        : []
    },

    handleAddToSelected(keyId) {
      if (!this.selectedKeys.includes(keyId)) {
        this.selectedKeys.push(keyId)
      } else {
        this.selectedKeys = this.selectedKeys.filter((id) => id !== keyId)
      }
    },

    handleDeleteAllKeysBtnClick() {
      this.$confirm('Вы действительно хотите удалить ключи?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.removeKeys({
              keys: this.selectedKeys
            })

            this.$notify({
              type: 'success',
              message: 'Ключи удалены'
            })
            this.selectedKeys = []
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении ключей'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    },

    handleLogoutBtnClick() {
      this.$confirm('Вы действительно хотите выйти из проекта?', {
        confirmButtonText: 'Выйти',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(async () => {
          try {
            const foundMember = this.members.find(
              ({ memberId }) => memberId === this.currentUser.id
            )

            if (foundMember) {
              const pathForRemove = `/api/v1//projects/${this.projectId}/members/${foundMember.memberId}`

              await this.$axios.$delete(pathForRemove)

              this.$router.push('/projects')

              this.$notify({
                type: 'success',
                message: 'Вы вышли из проекта'
              })
            } else {
              this.$notify({
                type: 'error',
                message:
                  'Ошибка при выходе из проект. Обратитесь к службе поддержки'
              })
            }
          } catch (e) {
            this.$notify({
              type: 'error',
              message:
                'Ошибка при выходе из проект. Обратитесь к службе поддержки'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/buttonDefaultStylesReset';

.project-keys {
  &__actions {
    display: flex;
    margin-bottom: 15px;
  }

  &__search {
    width: 368px;
    margin-right: auto;
  }
}

.project-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;

  &__left {
    flex-grow: 1;
    width: 50%;
  }

  &__right {
    flex-grow: 1;
    width: 50%;
    display: flex;
    justify-content: flex-end;

    &_full {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__select-all {
    margin-right: 16px;
  }
}

.delete-all-keys {
  @include buttonDefaultStylesReset;

  position: relative;
  padding: 10px 12px 10px 36px;
  color: #b92500;
  line-height: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url('/icons/icon-trash.svg');
    background-repeat: no-repeat;
  }
}
</style>
