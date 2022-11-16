<template>
  <div class="word">
    <div v-if="isFieldShown" class="new-word">
      <el-input
        v-model="newValue"
        class="new-word__field"
        size="small"
        placeholder="Введите перевод"
      />
      <div class="new-word__actions">
        <el-button
          v-if="!word.id"
          :loading="isLoading"
          type="primary"
          @click.prevent="handleSaveBtnClick"
        >
          Сохранить
        </el-button>
        <el-button
          v-else
          :loading="isLoading"
          type="primary"
          @click.prevent="handleUpdateBtnClick"
        >
          Обновить
        </el-button>
        <el-button type="danger" @click="isFieldShown = false">
          Отмена
        </el-button>
      </div>
    </div>
    <template v-else>
      <div v-if="word.value" class="word__value" @click="handleWordClick">
        {{ word.value || 'Пусто' }}
      </div>
      <div
        v-else
        class="word__value word__value_empty"
        @click="handleWordClick"
      >
        Пусто
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'WordField',

  props: {
    keyId: {
      type: Number,
      default: null
    },
    languageId: {
      type: Number,
      default: null
    },
    word: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isLoading: false,
      newValue: '',
      isFieldShown: false
    }
  },

  methods: {
    ...mapActions('projects', ['createWord', 'updateWord']),

    handleWordClick() {
      this.isFieldShown = true
      this.newValue = this.word.value
    },

    async handleSaveBtnClick() {
      this.isLoading = true

      try {
        await this.createWord({
          keyId: this.keyId,
          body: {
            languageId: this.languageId,
            value: this.newValue
          }
        })
        this.isFieldShown = false
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при сохранении слова'
        })
      }

      this.isLoading = false
    },

    handleUpdateBtnClick() {
      if (this.word.id && !this.newValue) {
        this.$confirm('Вы действительно хотите сохранить пустое значение?', {
          confirmButtonText: 'Сохранить',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
          .then(() => {
            this.handleWordUpdate()
          })
          .catch(() => {
            // do nothing
          })

        return
      }

      this.handleWordUpdate()
    },

    async handleWordUpdate() {
      this.isLoading = true

      try {
        await this.updateWord({
          keyId: this.keyId,
          wordId: this.word.id,
          body: {
            value: this.newValue
          }
        })
        this.isFieldShown = false
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при сохранении слова'
        })
      }

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.word {
  &__value {
    line-height: 40px;
    cursor: pointer;
    color: #061938;

    &_empty {
      cursor: pointer;
      color: #c1c7d0;
    }
  }
}

.new-word {
  &__field {
    display: block;

    /deep/ .el-input {
      &__inner {
        height: 40px;
      }
    }
  }

  &__actions {
    margin-top: 12px;
  }
}
</style>
