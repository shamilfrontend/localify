<template>
  <el-form
    class="project-export"
    :model="formModel"
    :rules="formRules"
    label-position="top"
  >
    <el-form-item label="Выбрать платформу" prop="platform" size="small">
      <el-radio-group v-model="formModel.platform">
        <el-radio
          v-for="platform in platforms"
          :key="platform.value"
          :label="platform.label"
        >
          {{ platform.value }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Выбрать формат" prop="email" size="small">
      <el-radio-group v-model="formModel.format">
        <el-radio
          v-for="format in formats"
          :key="format.value"
          :label="format.label"
        >
          {{ format.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Выбрать языки" prop="email" size="small">
      <el-checkbox
        v-model="isAllLanguagesSelected"
        class="project-export__select-languages"
        @change="handleCheckAllChange"
      >
        Выбрать все языки
      </el-checkbox>

      <div class="languages">
        <div
          v-for="language in languages"
          :key="language.id"
          class="languages__item"
        >
          <el-checkbox
            :value="formModel.languages.includes(language.id)"
            :label="language.id"
            @change="handleLanguageChange(language.id)"
          >
            <img
              :src="`/languages/${language.code}.svg`"
              :alt="language.name"
              class="languages__img"
            />
            <span class="languages__name">{{ language.name }}</span>
            <span>
              Переведено ключей {{ language.quantityCompletedWords }} из
              {{ language.quantityWords }}
            </span>
          </el-checkbox>
        </div>
      </div>
    </el-form-item>

    <div class="project-export__buttons">
      <el-button
        type="primary"
        :disabled="isDisabled"
        @click="handleExportBtnClick"
      >
        Экспортировать
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'

import mixinFetchProjectByID from '../../mixins/fetchProjectByID'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ExportKeys',

  mixins: [mixinDefaultProps, mixinFetchProjectByID],

  data() {
    return {
      platforms: [
        {
          value: 'Web',
          label: 'web'
        },
        {
          value: 'ios',
          label: 'IOS'
        },
        {
          value: 'android',
          label: 'Android'
        }
      ],
      formats: [
        {
          value: 'strings',
          label: '.strings'
        },
        {
          value: 'xml',
          label: '.xml'
        },
        {
          value: 'po',
          label: '.po'
        },
        {
          value: 'xliff',
          label: '.xliff'
        }
      ],

      formModel: {
        platform: 'web',
        format: '.strings',
        languages: []
      },
      formRules: {},
      isAllLanguagesSelected: true
    }
  },

  computed: {
    ...mapState('projects', {
      languages: (state) => state.openedProject.languages,
      keys: (state) => state.openedProject.keys
    }),

    isDisabled() {
      return (
        !this.selectedPlatform ||
        !this.selectedFormat ||
        !this.selectedLanguages.length
      )
    },

    languagesIds() {
      return this.languages.map(({ id }) => id)
    }
  },

  watch: {
    selectedLanguages() {
      this.isAllLanguagesSelected =
        this.selectedLanguages.length === this.languagesIds.length
    }
  },

  async mounted() {
    await this.getProjectByID()

    this.selectedLanguages = this.isAllLanguagesSelected
      ? this.languagesIds
      : []
  },

  methods: {
    handleCheckAllChange(isChecked) {
      this.selectedLanguages = isChecked ? this.languagesIds : []
    },

    handleLanguageChange(languageId) {
      if (!this.selectedLanguages.includes(languageId)) {
        this.selectedLanguages.push(languageId)
      } else {
        this.selectedLanguages = this.selectedLanguages.filter(
          (id) => id !== languageId
        )
      }
    },

    handleExportBtnClick() {}
  }
}
</script>

<style lang="scss" scoped>
.project-export {
  &__select-languages {
    display: block;
    margin-bottom: 12px;
  }
}

.languages {
  &__item {
    margin-bottom: 8px;

    /deep/.el-checkbox {
      display: flex;
      align-items: center;

      &__label {
        display: flex;
        align-items: center;
      }
    }
  }

  &__img,
  &__name {
    margin-right: 8px;
  }
}
</style>
