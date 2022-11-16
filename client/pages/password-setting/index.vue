<template>
  <el-card shadow="always" class="empty-page">
    <el-form
      ref="savePasswordForm"
      :model="formModel"
      :rules="rules"
      label-position="top"
    >
      <h1 class="empty-page__title">Задайте новый пароль</h1>
      <el-form-item label="Новый пароль" prop="email" size="small">
        <el-input
          v-model="formModel.new"
          type="password"
          size="small"
          placeholder="Введите новый пароль"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="Повторите пароль" prop="email" size="small">
        <el-input
          v-model="formModel.confirmation"
          type="password"
          size="small"
          placeholder="Повторите пароль"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="empty-page__btn"
          type="primary"
          :loading="isLoading"
          size="small"
          @click="handleSaveBtnClick"
        >
          Обновить пароль
        </el-button>

        <nuxt-link class="empty-page__link" to="/signin">Войти</nuxt-link>
        <nuxt-link class="empty-page__link" to="/signup">
          Регистраций
        </nuxt-link>
        <nuxt-link class="empty-page__link" to="/password-recovery">
          Забыли пароль?
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
        new: '',
        confirmation: '',
        userId: null
      },

      rules: {
        rules: {
          new: {
            required: true,
            trigger: 'blur',
            validator: this.validatePassNew
          },
          confirmation: {
            required: true,
            trigger: 'blur',
            validator: this.validatePassConfirm
          }
        }
      }
    }
  },

  created() {
    this.checkToken()
  },

  methods: {
    async checkToken() {
      const { token } = this.$route.query

      if (!token) {
        this.$router.push('/password-recovery')
      }

      try {
        const { userId } = await this.$axios.$get(
          `/api/v1/users/check/${token}`
        )
        this.formModel.userId = userId
        this.formModel.token = token
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Токен устарел, запросите новый'
        })
        this.$router.push('/password-recovery')
      }
    },

    validatePassNew(rule, value, callback) {
      if (this.form.confirmation !== '') {
        this.$refs.form.validateField('confirmation')
      }

      callback()
    },
    validatePassConfirm(rule, value, callback) {
      if (value === '' || value !== this.form.new) {
        callback(new Error('Введенные пароли не совпадают.'))
      } else {
        callback()
      }
    },

    handleSaveBtnClick() {
      this.$refs.savePasswordForm.validate(async (isValid) => {
        if (!isValid) return

        try {
          await this.$axios.$post(
            '/api/v1/users/update_password',
            this.formModel
          )

          this.$notify({
            type: 'success',
            message: 'Пароль успешно обновлен, теперь вы можете войти в системе'
          })

          this.$router.push('/signin')
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при обновлении пароля'
          })
        }
      })
    }
  },

  head() {
    return {
      title: `Задайте новый пароль`
    }
  }
}
</script>
