<template>
  <div class="project-members">
    <div class="project-members__header">
      <el-input
        v-model="searchValue"
        class="project-members__search"
        type="search"
        placeholder="Поиск участников..."
        size="small"
      />

      <el-button
        type="primary"
        size="small"
        @click="isAddMembersModalShown = true"
      >
        Добавить участника
      </el-button>

      <el-dialog
        title="Добавить участника"
        :visible.sync="isAddMembersModalShown"
        width="320px"
        class="add-member"
        center
      >
        <el-form
          ref="addMemberForm"
          :model="formModel"
          :rules="rules"
          label-position="top"
        >
          <el-form-item label="Email" prop="email" size="small">
            <el-select
              v-model="formModel.email"
              placeholder="Введите email пользователя"
              size="small"
              :remote-method="getUserByEmail"
              :loading="isLoading"
              filterable
              remote
            >
              <el-option
                v-for="user in users"
                :key="user.id"
                :label="user.name"
                :value="user.email"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Role" prop="role" size="small">
            <el-select
              v-model="formModel.role"
              placeholder="Выбрать роль"
              size="small"
              clearable
            >
              <el-option
                v-for="role in roles"
                :key="role.id"
                :label="role.label"
                :value="role.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item size="small">
            <el-button
              class="add-member__btn"
              type="primary"
              size="small"
              @click="handleAddMemberSubmit"
            >
              Добавить
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <el-table :data="members" stripe>
      <el-table-column width="60" prop="name">
        <template slot-scope="{ row }">
          <div
            class="project-members__avatar"
            :style="`background-color: ${row.color}`"
          >
            {{ getAvatarName(row.name) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Имя" />
      <el-table-column prop="email" label="Email" />
      <el-table-column #default="{ row }" prop="role" label="Роль">
        <span v-if="row.role === 0">Владелец проекта</span>
        <el-select
          v-else
          :value="row.role"
          placeholder="Выбрать роль"
          @change="handleRoleChange"
          @focus="selectedMember = row.memberId"
        >
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.label"
            :value="role.id"
          />
        </el-select>
      </el-table-column>
      <el-table-column #default="{ row }" width="88">
        <div v-if="row.role !== 0" class="project-members__buttons">
          <el-tooltip content="Удалить участника" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="handleDeleteMemberBtnClick(row.memberId)"
            />
          </el-tooltip>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getAvatarName } from '@/common/helpers'

const roles = [
  {
    id: 3,
    label: 'Менеджер'
  },
  {
    id: 1,
    label: 'Разработчик'
  },
  {
    id: 2,
    label: 'Переводчик'
  }
]

export default {
  name: 'ProjectMembers',

  data() {
    return {
      searchValue: '',
      isAddMembersModalShown: false,
      isLoading: false,
      roles,
      formModel: {
        email: '',
        role: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ]
      },
      users: [],
      selectedMember: null
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('projects', {
      members: (state) => state.openedProject.members
    })
  },

  methods: {
    ...mapActions('projects', [
      'addMember',
      'removeMember',
      'updateMemberRole'
    ]),

    getAvatarName(name) {
      return getAvatarName(name)
    },

    async getUserByEmail(email) {
      if (email !== '') {
        this.isLoading = true

        try {
          const users = await this.$axios.$get(`/api/v1/users/${email}`)
          this.users = users.filter(
            (user) => user.email !== this.currentUser.email
          )
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при поиске пользователя'
          })
        }
        this.isLoading = false
      } else {
        this.formModel.email = ''
      }
    },

    handleAddMemberSubmit() {
      this.$refs.addMemberForm.validate(async (isValid) => {
        if (!isValid) {
          return
        }

        try {
          await this.addMember(this.formModel)
          this.isAddMembersModalShown = false
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при добавлении участника'
          })
        }

        this.isLoading = true
      })
    },

    handleDeleteMemberBtnClick(memberId) {
      this.$confirm('Вы действительно хотите удалить участника?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.removeMember({ memberId })
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении участника'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    },

    async handleRoleChange(role) {
      try {
        await this.updateMemberRole({
          memberId: this.selectedMember,
          role
        })

        this.$notify({
          type: 'success',
          message: 'Роль участника изменена'
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при изменении роли участника'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/avatarStyles';

.project-members {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__search {
    width: 368px;
  }

  &__avatar {
    @include avatarStyles();
  }

  &__buttons {
    text-align: right;
  }
}

.add-member {
  text-align: center;

  /deep/ .el-select {
    width: 100%;
  }

  &__btn {
    width: 100%;
  }
}
</style>
