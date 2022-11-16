<template>
  <el-form
    ref="addProjectForm"
    :model="formModel"
    :rules="formRules"
    class="project-import"
    label-position="top"
  >
    <el-form-item label="Выбрать файл" prop="file" size="small">
      <el-upload
        class="project-import__upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList"
        multiple
        drag
      >
        <span class="el-icon-upload"></span>
        <div class="el-upload__text">
          Перетащите сюда файл или нажмите, чтобы загрузить
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="Выбрать языки" prop="languages" size="small">
      <el-select
        v-model="formModel.languages"
        size="small"
        class="custom-full-width"
        multiple
        filterable
        placeholder="Выберите языки"
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
    <el-button type="primary">Upload</el-button>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'

import mixinRoleLogic from '../../mixins/roleLogic'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ProjectImport',

  mixins: [mixinDefaultProps, mixinRoleLogic],

  data() {
    return {
      fileList: [],
      formModel: {
        file: null,
        languages: []
      },
      formRules: {}
    }
  },

  computed: {
    ...mapState('languages', ['languages'])
  }
}
</script>

<style lang="scss" scoped>
.project-import {
  &__upload {
    /deep/ {
      .el-upload,
      .el-upload-dragger {
        display: block;
        width: 100%;
      }

      .el-icon-upload {
        margin-top: 0;
      }

      .el-upload-dragger {
        height: auto;
        padding: 60px 0;
      }
    }
  }
}
</style>
