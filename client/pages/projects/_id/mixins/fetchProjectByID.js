import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('projects', ['fetchProjectById']),

    getProjectByID() {
      this.fetchProjectById(this.$route.params.id).catch(() => {
        this.$router.push('/projects')
        this.$notify({
          type: 'error',
          message: 'Проект не найден'
        })
      })
    }
  }
}
