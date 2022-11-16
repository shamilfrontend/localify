<template>
  <div class="project-key">
    <div class="project-key__left">
      <div class="project-key__left-top">
        <template v-if="!isTranslator">
          <el-checkbox
            :value="selectedKeys.includes(keyData.id)"
            class="project-key__checkbox"
            @change="$emit('toggle-key', keyData.id)"
          />

          <key-name
            class="project-key__edit"
            :key-id="keyData.id"
            :name="keyData.name"
            :description="keyData.description"
          />
        </template>
        <strong v-else>{{ keyData.name }}</strong>
      </div>

      <div class="key-buttons">
        <el-tooltip
          content="Прикрепить скриншот (JPG, PNG) 5mb"
          placement="top"
        >
          <el-button
            icon="el-icon-paperclip"
            size="mini"
            circle
            @click="handleFileButtonClick(keyData.id)"
          />
        </el-tooltip>
        <el-tooltip content="Комментарии" placement="top">
          <el-button
            icon="el-icon-s-comment"
            size="mini"
            circle
            @click="handleOpenCommentBtnClick(keyData.id)"
          />
        </el-tooltip>
        <el-tooltip v-if="!isTranslator" content="Удалить ключ" placement="top">
          <el-button
            icon="el-icon-delete-solid"
            size="mini"
            circle
            @click="handleDeleteKeyBtnClick(keyData.id)"
          />
        </el-tooltip>
      </div>

      <div v-if="keyData.screenshots.length" class="project-screenshots">
        <div
          v-for="screenshot in keyData.screenshots"
          :key="screenshot.id"
          class="project-screenshots__item"
          @click="handleScreenshotClick(screenshot)"
        >
          <img :src="`/screenshots/${screenshot.path}`" alt="screenshot" />
        </div>
      </div>
    </div>

    <div class="project-key__right">
      <div v-for="language in languages" :key="language.id" class="translate">
        <div class="translate__name">
          <span>{{ language.name }}</span>
        </div>
        <word-field
          class="translate__word"
          :key-id="keyData.id"
          :language-id="language.id"
          :word="getWordByLangId(language.id, keyData.words)"
        />
      </div>
    </div>

    <input
      ref="uploadScreenshot"
      type="file"
      hidden
      multiple
      @change="handleSelectFileChange"
    />

    <el-dialog
      :visible.sync="isScreenshotModalShown"
      class="screenshot-modal"
      center
    >
      <img :src="`/screenshots/${selectedScreenshot.path}`" alt="screenshot" />

      <el-button
        type="danger"
        class="screenshot-modal__btn"
        @click="handleRemoveScreenshotBtnClick"
      >
        Удалить скриншот
      </el-button>
    </el-dialog>

    <el-drawer
      v-if="isCommentDrawerShown"
      title="Комментарии"
      :visible.sync="isCommentDrawerShown"
      @close="handleDrawerClose"
    >
      <div class="comments-wrap">
        <key-comments :key-id="keyData.id" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import mixinRoleLogic from '../../../mixins/roleLogic'

import KeyName from './KeyName'
import WordField from './WordField'
import KeyComments from './KeyComments'

export default {
  name: 'ProjectKey',

  components: {
    KeyName,
    WordField,
    KeyComments
  },

  mixins: [mixinRoleLogic],

  props: {
    keyData: {
      type: Object,
      default: () => ({})
    },
    languages: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedScreenshot: {},
      selectedKeyId: null,
      isScreenshotModalShown: false,
      isCommentDrawerShown: false
    }
  },

  methods: {
    ...mapActions('projects', [
      'uploadScreenshots',
      'removeScreenshot',
      'removeKeys'
    ]),
    ...mapActions('comments', ['fetchCommentsByKeyId']),
    ...mapMutations('comments', ['clearComments']),

    handleAddToSelected(keyId) {
      if (!this.selectedKeys.includes(keyId)) {
        this.selectedKeys.push(keyId)
      } else {
        this.selectedKeys = this.selectedKeys.filter((id) => id !== keyId)
      }
    },

    handleFileButtonClick(keyId) {
      this.selectedKeyId = keyId
      this.$refs.uploadScreenshot.click()
    },

    async handleSelectFileChange() {
      const { files } = this.$refs.uploadScreenshot

      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i], files[i].name)
      }

      try {
        await this.uploadScreenshots({
          keyId: this.selectedKeyId,
          formData
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при загрузке скриншота'
        })
      }
    },

    handleRemoveScreenshotBtnClick() {
      this.$confirm('Вы действительно хотите удалить скриншот?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(() => {
          this.deleteScreenshot()
          this.isScreenshotModalShown = false
        })
        .catch(() => {
          // do nothing
        })
    },

    async deleteScreenshot() {
      try {
        await this.removeScreenshot({
          KeyId: this.selectedKeyId,
          screenshotId: this.selectedScreenshot.id
        })

        this.$notify({
          type: 'success',
          message: 'Скриншот удален'
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при удалении скриншота'
        })
      }
    },

    handleDeleteKeyBtnClick(id) {
      this.$confirm('Вы действительно хотите удалить ключ?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.removeKeys({
              keys: [id]
            })

            this.$notify({
              type: 'success',
              message: 'Ключ удален'
            })
          } catch (e) {
            this.$notify({
              type: 'error',
              message: 'Ошибка при удалении ключей'
            })
          }
        })
        .catch(() => {
          // do nothing
        })
    },

    async handleOpenCommentBtnClick() {
      try {
        await this.fetchCommentsByKeyId(this.keyData.id)
        this.isCommentDrawerShown = true
      } catch (e) {
        this.$notify({
          type: 'error',
          message: 'Ошибка при загрузке комментариев'
        })
      }
    },

    handleDrawerClose() {
      this.clearComments()
    },

    handleScreenshotClick(screenshot) {
      this.selectedKeyId = screenshot.keyId
      this.selectedScreenshot = screenshot
      this.isScreenshotModalShown = true
    },

    getWordByLangId(langId, words = []) {
      if (!words.length) return {}
      const foundWord = words.find(({ languageId }) => languageId === langId)
      if (!foundWord) return {}
      return foundWord
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins/buttonDefaultStylesReset';

.project-key {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  border: 1px solid #dfe1e6;

  &__left {
    position: relative;
    width: 212px;
    padding: 10px;

    &-top {
      display: flex;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    &-bottom {
      margin-bottom: 8px;
    }
  }

  &__checkbox {
    margin-right: 8px;
    padding-top: 2px;
    word-break: break-all;
  }

  &__right {
    width: calc(100% - 212px);
    background-image: linear-gradient(
      to right,
      #ebecf0 200px,
      transparent 200px
    );
  }
}

.key-buttons {
  margin-bottom: 16px;
}

.translate {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe1e6;

  &__name,
  &__word {
    padding: 15px;
  }

  &__name {
    display: flex;
    align-items: center;
    width: 200px;
    color: #061938;
    background-color: #ebecf0;
    border-right: 1px solid #eee;
  }

  &__word {
    width: calc(100% - 200px);
  }
}

.screenshot-modal {
  /deep/ .el-dialog__body {
    text-align: center;

    & > img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      height: auto;
    }
  }

  &__btn {
    margin-top: 16px;
  }
}

.project-screenshots {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__item {
    position: relative;
    width: 72px;
    margin-right: 5px;
    margin-bottom: 8px;
    break-inside: avoid;
    border: 1px solid #eee;
    cursor: pointer;

    & > img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      opacity: 0;
      transition: 0.2s opacity linear;
    }

    &::before {
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &::after {
      left: 50%;
      top: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      background-image: url('/loupe-icon.svg');
      background-repeat: no-repeat;
    }

    &:hover {
      &::before,
      &::after {
        opacity: 1;
      }
    }
  }
}

.comments-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
