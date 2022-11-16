<template>
  <div class="key-name">
    <button
      class="key-name__title"
      type="button"
      @click="handleChangeKeyButtonClick"
    >
      {{ name }}
    </button>

    <el-dialog
      v-if="isEditKeyModalShown"
      :visible.sync="isEditKeyModalShown"
      title="Изменить ключ"
      width="480px"
      center
    >
      <el-form
        ref="editKeyForm"
        :model="formModel"
        :rules="rules"
        method="post"
        label-position="top"
      >
        <el-form-item label="Ключ" prop="name" size="small">
          <el-input v-model="formModel.name" size="small" required />
        </el-form-item>
        <el-form-item label="Описание" prop="description" size="small">
          <el-input v-model="formModel.description" size="small" required />
        </el-form-item>
        <el-button
          :loading="isLoading"
          type="primary"
          native-type="button"
          @click.prevent="handleCreateKeyBtnClick"
        >
          Сохранить
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'KeyName',

  props: {
    keyId: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isLoading: false,
      isEditKeyModalShown: false,
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

  watch: {
    name() {
      this.formModel.description = this.description
    },
    description() {
      this.formModel.description = this.description
    }
  },

  mounted() {
    this.formModel.name = this.name
    this.formModel.description = this.description
  },

  methods: {
    ...mapActions('projects', ['updateKey']),

    handleChangeKeyButtonClick() {
      this.isEditKeyModalShown = true
    },

    handleCreateKeyBtnClick() {
      this.$refs.editKeyForm.validate(async (isValid) => {
        if (!isValid) return

        this.isLoading = true

        try {
          await this.updateKey({
            keyId: this.keyId,
            body: {
              name: this.formModel.name,
              description: this.formModel.description
            }
          })

          this.$notify({
            type: 'success',
            message: 'Ключ сохранен'
          })

          this.isEditKeyModalShown = false
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
@import '~/assets/styles/mixins/buttonDefaultStylesReset';

.key-name {
  &__title {
    @include buttonDefaultStylesReset;

    color: var(--color-primary-blue);
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
