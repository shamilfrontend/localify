<template>
  <the-page-wrap :breadcrumbs-list="breadcrumbsList">
    <el-tabs type="card">
      <el-tab-pane label="Ключевые слова">
        <project-keys />
      </el-tab-pane>

      <el-tab-pane label="Импорт">
        <project-import />
      </el-tab-pane>

      <el-tab-pane label="Экспорт">
        <project-export />
      </el-tab-pane>

      <el-tab-pane label="Участники">
        <project-members />
      </el-tab-pane>

      <el-tab-pane label="Статистика">
        <project-statistics />
      </el-tab-pane>

      <el-tab-pane label="Настройки проекта">
        <project-settings />
      </el-tab-pane>
    </el-tabs>
  </the-page-wrap>
</template>

<script>
import { mapState } from 'vuex'

import ProjectKeys from './components/ProjectKeys'
import ProjectImport from './components/ProjectImport'
import ProjectExport from './components/ProjectExport'
import ProjectMembers from './components/ProjectMembers'
import ProjectStatistics from './components/ProjectStatistics'
import ProjectSettings from './components/ProjectSettings'

import mixinFetchProjectByID from './mixins/fetchProjectByID'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'AdminProjectsPage',

  components: {
    ProjectKeys,
    ProjectImport,
    ProjectExport,
    ProjectMembers,
    ProjectStatistics,
    ProjectSettings
  },

  mixins: [mixinFetchProjectByID, mixinDefaultProps],

  data() {
    return {
      activeName: 'first'
    }
  },

  computed: {
    ...mapState('projects', {
      id: (state) => state.openedProject.id,
      name: (state) => state.openedProject.name
    }),

    breadcrumbsList() {
      return [
        {
          path: '/projects',
          title: 'Проекты'
        },
        {
          path: `/projects/${this.id}`,
          title: this.name
        }
      ]
    }
  },

  mounted() {
    this.getProjectByID()
  }
}
</script>
