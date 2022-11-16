<template>
  <el-card shadow="always" class="empty-page">
    <el-form
      ref="registrationForm"
      :model="formModel"
      :rules="rules"
      label-position="top"
    >
      <h1 class="empty-page__title">Registration</h1>
      <el-form-item label="Name" prop="name" size="small">
        <el-input
          v-model="formModel.name"
          type="email"
          size="small"
          placeholder="Введите имя"
          clearable
        />
      </el-form-item>
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
      <el-form-item>
        <el-button
          class="empty-page__btn"
          type="primary"
          :loading="isLoading"
          size="small"
          @click="handleRegistrationBtnClick"
        >
          Регистрация
        </el-button>
        <nuxt-link class="empty-page__link" to="/signin">Войти</nuxt-link>
        <nuxt-link class="empty-page__link" to="/password-recovery">
          Забыли пароль?
        </nuxt-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUpPage',

  layout: 'empty',

  data() {
    return {
      isLoading: false,
      formModel: {
        email: '',
        name: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Пожалуйста заполните поле',
            trigger: 'blur'
          }
        ],
        name: [
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

    handleRegistrationBtnClick() {
      this.isLoading = true

      this.$refs.registrationForm.validate(async (isValid) => {
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
            message: 'Ошибка при регистрации'
          })
        }
      })

      this.isLoading = false
    }
  },

  head() {
    return {
      title: `Регистрация`
    }
  }
}
</script>
