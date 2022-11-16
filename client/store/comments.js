export const state = () => ({
  comments: []
})

export const mutations = {
  setComments(state, comments) {
    state.comments = comments
  },
  createCommentToKey(state, comment) {
    state.comments.push(comment)
  },
  removeCommentBiID(state, commentId) {
    state.comments = state.comments.filter(
      (comment) => comment.id !== commentId
    )
  },
  updateCommentBiID(state, { commentId, message }) {
    const foundComment = state.comments.find(
      (comment) => comment.id === commentId
    )

    if (foundComment) {
      foundComment.message = message
    }
  },
  clearComments(state) {
    state.comments = []
  }
}

export const actions = {
  fetchCommentsByKeyId({ rootState, commit }, keyId) {
    const projectId = rootState.projects.openedProject.id
    return this.$axios
      .$get(`/api/v1/projects/${projectId}/keys/${keyId}/comments`)
      .then((comments) => {
        commit('setComments', comments)
        return comments
      })
  },
  createCommentToKey({ rootState, commit }, { keyId, body }) {
    const projectId = rootState.projects.openedProject.id
    return this.$axios
      .$post(`/api/v1/projects/${projectId}/keys/${keyId}/comments`, body)
      .then((comment) => {
        commit('createCommentToKey', comment)
      })
  },
  removeCommentBiID({ rootState, commit }, { keyId, commentId }) {
    const projectId = rootState.projects.openedProject.id
    return this.$axios
      .$delete(
        `/api/v1//projects/${projectId}/keys/${keyId}/comments/${commentId}`
      )
      .then(() => {
        commit('removeCommentBiID', commentId)
      })
  },
  updateCommentBiID({ rootState, commit }, { keyId, commentId, message }) {
    const projectId = rootState.projects.openedProject.id
    return this.$axios
      .$put(
        `/api/v1//projects/${projectId}/keys/${keyId}/comments/${commentId}`,
        { message }
      )
      .then((response) => {
        commit('updateCommentBiID', response)
      })
  }
}
