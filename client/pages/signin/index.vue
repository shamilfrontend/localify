<template>
  <el-card shadow="always" class="empty-page">
    <el-form
      ref="loginForm"
      :model="formModel"
      :rules="rules"
      label-position="top"
    >
      <h1 class="empty-page__title">Авторизация</h1>
      <el-form-item label="Email" prop="email" size="small">
        <el-input
          v-model="formModel.email"
          type="email"
          size="small"
          placeholder="Введите email"
          clearable
        />
      </el-form-item>
      <el-form-item label="Пароль" prop="password" size="small">
        <el-input
          v-model="formModel.password"
          type="password"
          size="small"
          placeholder="Введите пароль"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item class="empty-page__last-item">
        <el-button
          class="empty-page__btn"
          type="primary"
          :loading="isLoading"
          size="small"
          @click="handleLoginBtnClick"
        >
          Войти
        </el-button>
        <a
          class="empty-page__link empty-page__link_google"
          :href="'/api/v1/google'"
        >
          Войти с помощью Google
        </a>
        <nuxt-link class="empty-page__link" to="/signup">
          Регистраций
        </nuxt-link>
        <nuxt-link class="empty-page__link" to="/password-recovery">
          Забыли пароль?
        </nuxt-link>
        <button
          class="empty-page__link"
          type="button"
          @click="handleDemoBtnClick"
        >
          Смотреть демо версию
        </button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',

  layout: 'empty',

  data() {
    return {
      isLoading: false,
      formModel: {
        email: 'shamil@mail.ru',
        password: '12345678'
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ],
        password: [
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
    ...mapActions('auth', ['signIn']),

    handleLoginBtnClick() {
      this.isLoading = true

      this.$refs.loginForm.validate(async (isValid) => {
        if (!isValid) {
          this.isLoading = false
          return
        }

        try {
          await this.signIn(this.formModel)
          this.$router.push('/')
        } catch (e) {
          this.$notify({
            type: 'error',
            message: 'Ошибка при авторизации'
          })
        }
      })

      this.isLoading = false
    },

    async handleDemoBtnClick() {
      try {
        await this.signIn({
          email: 'demo@mail.ru',
          password: '12345678'
        })
        this.$router.push('/')
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при входе в демо-версию'
        })
      }
    }
  },

  head() {
    return {
      title: `Авторизация`
    }
  }
}
</script>
