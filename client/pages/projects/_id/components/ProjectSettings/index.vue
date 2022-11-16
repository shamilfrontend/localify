<template>
  <el-form
    ref="projectSetting"
    :model="formModel"
    :rules="rules"
    label-position="top"
    class="project-settings"
  >
    <el-form-item label="Название" prop="name" size="small">
      <el-input
        v-model="formModel.name"
        size="small"
        placeholder="Введите название проекта"
        clearable
      />
    </el-form-item>
    <el-form-item label="Описание" prop="description" size="small">
      <el-input
        v-model="formModel.description"
        size="small"
        placeholder="Введите описание проекта"
        clearable
      />
    </el-form-item>
    <el-form-item label="Языки" prop="languages" size="small">
      <el-select
        v-model="formModel.languages"
        class="custom-full-width"
        multiple
        size="small"
        placeholder="Выберите языки"
        clearable
      >
        <el-option
          v-for="language in languages"
          :key="language.id"
          :label="language.name"
          :value="language.id"
        />
      </el-select>
    </el-form-item>

    <div>
      <el-button
        v-if="isOwner"
        type="danger"
        :loading="isLoading"
        size="small"
        @click="handleDeleteProjectBtnClick"
      >
        Удалить проект
      </el-button>
      <el-button
        type="primary"
        :loading="isLoading"
        size="small"
        @click="handleSaveProjectBtnClick"
      >
        Сохранить
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import mixinRoleLogic from '../../mixins/roleLogic'

export default {
  name: 'ProjectSettings',

  mixins: [mixinRoleLogic],

  data() {
    return {
      formModel: {
        name: '',
        description: '',
        languages: []
      },

      rules: {
        name: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ],
        languages: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ]
      },

      isLoading: false
    }
  },

  computed: {
    ...mapState('projects', {
      projectId: (state) => state.openedProject.id,
      projectName: (state) => state.openedProject.name,
      projectDescription: (state) => state.openedProject.description,
      projectLanguages: (state) => state.openedProject.languages
    }),
    ...mapState('languages', ['languages'])
  },

  watch: {
    projectName: {
      handler(name) {
        this.formModel.name = name
      },
      immediate: true
    },
    projectDescription: {
      handler(description) {
        this.formModel.description = description
      },
      immediate: true
    },
    projectLanguages: {
      handler(languages) {
        languages.forEach(({ id }) => {
          if (!this.formModel.languages.includes(id)) {
            this.formModel.languages.push(id)
          }
        })
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('projects', ['updateProjectById']),

    handleSaveProjectBtnClick() {
      this.$refs.projectSetting.validate(async (isValid) => {
        if (!isValid) return

        try {
          await this.updateProjectById({
            name: this.formModel.name,
            languages: this.formModel.languages
          })

          this.$notify({
            type: 'success',
            message: 'Настройки сохранены'
          })
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при сохранении настроек'
          })
        }
      })
    },

    handleDeleteProjectBtnClick() {
      this.$confirm(
        'При удалении проекта, будут удалены все ключи и переводы.',
        'Вы действительно хотите удалить проект?',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'warning'
        }
      )
        .then(async () => {
          try {
            await this.$axios.$delete(`/api/v1/projects/${this.projectId}`)

            this.$notify({
              type: 'success',
              message: 'Проект удален'
            })

            await this.$router.push('/projects')
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении проекта'
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

.project-settings {
  width: 368px;
}
</style>
