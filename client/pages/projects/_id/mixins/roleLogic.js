import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('projects', {
      members: (state) => state.openedProject.members
    }),

    foundMember() {
      return this.members.find(
        (member) => member.memberId === this.currentUser.id
      )
    },

    isOwner() {
      if (!this.foundMember) return false
      return this.foundMember.role === 0
    },

    isManager() {
      if (!this.foundMember) return false
      return this.foundMember.role === 3
    },

    isDeveloper() {
      if (!this.foundMember) return false
      return this.foundMember.role === 1
    },

    isTranslator() {
      if (!this.foundMember) return false
      return this.foundMember.role === 2
    }
  }
}
