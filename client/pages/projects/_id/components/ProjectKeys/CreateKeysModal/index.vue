<template>
  <div class="create-key-modal">
    <el-button
      class="create-key-modal__open-btn icon-plus"
      type="primary"
      size="small"
      @click="handleOpenBtnClick"
    >
      Добавить ключ
    </el-button>

    <el-dialog
      v-if="isAddKeysModalShown"
      :visible.sync="isAddKeysModalShown"
      title="Add key"
      width="480px"
    >
      <el-form
        ref="addKeyForm"
        class="create-key-modal__form"
        :model="formModel"
        :rules="rules"
        method="post"
        label-position="top"
      >
        <el-form-item label="Key" prop="name" size="small">
          <el-input v-model="formModel.name" size="small" required />
        </el-form-item>
        <el-form-item label="Description" prop="description" size="small">
          <el-input v-model="formModel.description" size="small" required />
        </el-form-item>
        <el-button
          :loading="isLoading"
          type="primary"
          native-type="button"
          @click.prevent="handleCreateKeyBtnClick"
        >
          Add key
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateKeysModal',

  data() {
    return {
      isLoading: false,
      isAddKeysModalShown: false,
      formModel: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    ...mapActions('projects', ['createKeysToProject']),

    handleOpenBtnClick() {
      this.isAddKeysModalShown = true
    },

    handleCreateKeyBtnClick() {
      this.$refs.addKeyForm.validate(async (isValid) => {
        if (!isValid) return

        this.isLoading = true

        try {
          await this.createKeysToProject({
            keys: [
              {
                name: this.formModel.name,
                description: this.formModel.description
              }
            ]
          })

          this.$notify({
            type: 'success',
            message: 'Ключ создан'
          })

          this.formModel.name = ''
          this.formModel.description = ''

          this.isAddKeysModalShown = false
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при создании ключа'
          })
        }
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create-key-modal {
  &__open-btn {
    margin-right: 16px;
  }

  &__form {
    width: 100%;
  }
}
</style>
