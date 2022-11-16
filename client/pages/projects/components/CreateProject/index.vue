<template>
  <div class="create-project">
    <el-button size="small" @click="handleAddProjectBtnClick">
      Создать проект
    </el-button>

    <el-dialog
      title="Создать проект"
      :visible.sync="isAddProjectModalShown"
      width="480px"
    >
      <el-form
        ref="addProjectForm"
        :model="formModel"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Название" prop="name" size="small">
          <el-input
            v-model="formModel.name"
            size="small"
            placeholder="Введите название проекта..."
            clearable
          />
        </el-form-item>
        <el-form-item label="Описание" prop="name" size="small">
          <el-input
            v-model="formModel.description"
            size="small"
            placeholder="Введите описание проекта..."
            clearable
          />
        </el-form-item>
        <el-form-item label="Языки" prop="languages" size="small">
          <el-select
            v-model="formModel.languages"
            size="small"
            class="custom-full-width"
            multiple
            filterable
            placeholder="Выбрать"
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
        <div class="create-project__btn-group">
          <el-button
            :loading="isLoading"
            size="small"
            @click="isAddProjectModalShown = false"
          >
            Отменить
          </el-button>
          <el-button
            type="primary"
            :loading="isLoading"
            size="small"
            @click="handleCreateProjectBtnClick"
          >
            Добавить проект
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CreateProject',

  data() {
    return {
      isLoading: false,
      isAddProjectModalShown: false,
      formModel: {
        name: '',
        description: '',
        languages: ''
      },
      rules: {
        name: [
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
      }
    }
  },

  computed: {
    ...mapState('languages', ['languages']),
    ...mapState('projects', ['projects'])
  },

  methods: {
    ...mapActions('projects', ['createProject']),

    handleAddProjectBtnClick() {
      this.isAddProjectModalShown = true
    },

    handleCreateProjectBtnClick() {
      this.$refs.addProjectForm.validate(async (isValid) => {
        if (!isValid) return

        this.isLoading = true

        try {
          const response = await this.createProject(this.formModel)
          this.$emit('after-create-project', response)

          this.$notify({
            type: 'success',
            message: 'Проект создан'
          })

          this.isAddProjectModalShown = false
          this.clearFormData()
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при создании проекта'
          })
        }

        this.isLoading = false
      })
    },

    clearFormData() {
      this.formModel.name = ''
      this.formModel.description = ''
      this.formModel.languages = []
    }
  }
}
</script>

<style lang="scss" scoped>
.create-project {
  &__btn-group {
    margin-top: 24px;
  }
}
</style>
