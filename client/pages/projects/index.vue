<template>
  <the-page-wrap :breadcrumbs-list="breadcrumbsList">
    <create-project
      slot="header-actions"
      @after-create-project="handleAfterCreateProject"
    />

    <div class="projects-page__content">
      <div v-if="projects.length" class="project-list">
        <project-item
          v-for="project in projects"
          :id="project.id"
          :key="project.id"
          :name="project.name"
          :description="project.description"
          :members="project.members"
          :languages="project.languages"
          class="project-item"
        />
      </div>
      <p v-else>Список проектов пуст</p>
    </div>
  </the-page-wrap>
</template>

<script>
import CreateProject from './components/CreateProject'
import ProjectItem from './components/ProjectItem'
import mixinDefaultProps from '@/common/mixins/default-props'

export default {
  name: 'ProjectsPage',

  components: {
    CreateProject,
    ProjectItem
  },

  mixins: [mixinDefaultProps],

  async asyncData({ $axios }) {
    const projects = await $axios.$get('/api/v1/projects')
    return {
      projects
    }
  },

  data() {
    return {
      projects: [],
      breadcrumbsList: [
        {
          path: '/',
          title: 'Проекты'
        }
      ]
    }
  },

  async mounted() {
    this.projects = await this.$axios.$get('/api/v1/projects')
  },

  methods: {
    handleTitleClick(id) {
      this.$router.push(`/projects/${id}`)
    },

    handleAfterCreateProject(project) {
      this.projects.unshift(project)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-item {
  margin-bottom: 64px;
}
</style>
