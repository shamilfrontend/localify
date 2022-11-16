<template>
  <el-card shadow="always" class="empty-page">
    <el-form
      ref="resetPasswordForm"
      :model="formModel"
      :rules="rules"
      label-position="top"
    >
      <h1 class="empty-page__title">Восстановление пароля</h1>
      <el-form-item label="Email" prop="email" size="small">
        <el-input
          v-model="formModel.email"
          type="email"
          size="small"
          placeholder="Введите email"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="empty-page__btn"
          type="primary"
          :loading="isLoading"
          size="small"
          @click="handleRestoreBtnClick"
        >
          Восстановить
        </el-button>
        <nuxt-link class="empty-page__link" to="/signin">Войти</nuxt-link>
        <nuxt-link class="empty-page__link" to="/signup">
          Регистраций
        </nuxt-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'PasswordRecoveryPage',

  layout: 'empty',

  data() {
    return {
      isLoading: false,

      formModel: {
        email: ''
      },

      rules: {
        email: [
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
    handleRestoreBtnClick() {
      this.$refs.resetPasswordForm.validate(async (isValid) => {
        if (!isValid) return

        try {
          await this.$axios.$post(
            '/api/v1/users/reset_password',
            this.formModel
          )

          this.$notify({
            type: 'success',
            message:
              'На указанный вами email было выслано письмо, содержащее инструкции по восстановлению пароля'
          })
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при восстановлении'
          })
        }
      })
    }
  },

  head() {
    return {
      title: `Восстановление пароля`
    }
  }
}
</script>
