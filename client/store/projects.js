const cleanOpenedProjectData = () => ({
  id: null,
  name: '',
  description: '',
  keys: [],
  members: [],
  languages: []
})

export const state = () => ({
  projects: [],
  openedProject: cleanOpenedProjectData()
})

export const mutations = {
  addProject(state, project) {
    state.projects.unshift(project)
  },

  setProjects(state, projects) {
    state.projects = projects
  },

  setOpenedProject(state, project) {
    state.openedProject = project
  },

  addKeysToProject(state, keys) {
    keys.forEach((key) => {
      state.openedProject.keys.push(key)
    })
  },

  setScreenshots(state, { keyId, screenshots }) {
    const foundKey = state.openedProject.keys.find(
      (key) => key.id === Number(keyId)
    )

    if (foundKey) {
      screenshots.forEach((screenshot) => {
        foundKey.screenshots.push(screenshot)
      })
    }
  },

  removeScreenshot(state, { keyId, screenshotId }) {
    const foundKey = state.openedProject.keys.find(
      (key) => key.id === Number(keyId)
    )

    if (foundKey) {
      foundKey.screenshots = foundKey.screenshots.filter(
        ({ id }) => id !== screenshotId
      )
    }
  },

  removeKeyById(state, removedId) {
    state.openedProject.keys = state.openedProject.keys.filter(
      (key) => key.id !== removedId
    )
  },

  removeKeys(state) {
    state.openedProject.keys = []
  },

  addWordToKey(state, word) {
    const foundKey = state.openedProject.keys.find(
      (key) => key.id === word.keyId
    )

    if (foundKey) {
      foundKey.words.push(word)
    }
  },

  updateWordById(state, word) {
    const foundKey = state.openedProject.keys.find(
      (key) => key.id === word.keyId
    )

    if (foundKey) {
      const foundWord = foundKey.words.find(({ id }) => id === word.id)

      if (foundWord) {
        foundWord.value = word.value
      }
    }
  },

  updateProject(state, { name, description, languages }) {
    state.openedProject.name = name
    state.openedProject.description = description
    state.openedProject.languages = languages
  },

  incrementCommentsByKeyId(state, keyId) {
    const foundKey = state.openedProject.keys.find((key) => key.id === keyId)

    if (foundKey) {
      foundKey.quantityComments += 1
    }
  },

  decreaseCommentsByKeyId(state, keyId) {
    const foundKey = state.openedProject.keys.find((key) => key.id === keyId)

    if (foundKey) {
      foundKey.quantityComments -= 1
    }
  },

  setCommentsByKeyId(state, { keyId, length }) {
    const foundKey = state.openedProject.keys.find((key) => key.id === keyId)

    if (foundKey) {
      foundKey.quantityComments = length
    }
  },

  addMember(state, member) {
    state.openedProject.members.push(member)
  },

  removeMember(state, memberId) {
    state.openedProject.members = state.openedProject.members.filter(
      (member) => member.memberId !== memberId
    )
  },

  setMemberRole(state, member) {
    const foundMember = state.openedProject.members.find(
      ({ memberId }) => memberId === member.memberId
    )

    if (foundMember) {
      foundMember.role = member.role
    }
  },

  updateKey(state, { keyId, name, description }) {
    const foundKey = state.openedProject.keys.find(
      (key) => key.id === Number(keyId)
    )

    if (foundKey) {
      foundKey.name = name
      foundKey.description = description
    }
  },

  clearProjectsData(state) {
    state.projects = []
    state.openedProject = cleanOpenedProjectData()
  }
}

export const actions = {
  createProject({ commit }, passedData) {
    return this.$axios.$post(`/api/v1/projects`, passedData).then((project) => {
      commit('addProject', project)
      return project
    })
  },

  fetchProjects({ commit }) {
    return this.$axios.$get('/api/v1/projects').then((projects) => {
      commit('setProjects', projects)

      return projects
    })
  },

  fetchProjectById({ commit }, id) {
    return this.$axios.$get(`/api/v1/projects/${id}`).then((project) => {
      commit('setOpenedProject', project)
    })
  },

  updateProjectById({ state, commit }, { name, languages }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$put(`/api/v1/projects/${projectId}`, { name, languages })
      .then(({ name, description, languages }) => {
        commit('updateProject', {
          name,
          description,
          languages
        })
      })
  },

  createKeysToProject({ state, commit }, { keys }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$post(`/api/v1//projects/${projectId}/keys`, { keys })
      .then((keys) => {
        commit('addKeysToProject', keys)
      })
  },

  updateKey({ state, commit }, { keyId, body }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$put(`/api/v1/projects/${projectId}/keys/${keyId}`, body)
      .then(({ keyId, name, description }) => {
        commit('updateKey', {
          keyId,
          name,
          description
        })
      })
  },

  removeKeys({ state, commit }, { keys }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$post(`/api/v1/projects/${projectId}/keys/remove`, {
        keyIds: keys
      })
      .then(() => {
        if (keys.length === 1) {
          commit('removeKeyById', keys[0])
        } else {
          commit('removeKeys')
        }
      })
  },

  uploadScreenshots({ state, commit }, { keyId, formData }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$post(
        `/api/v1/projects/${projectId}/keys/${keyId}/screenshots`,
        formData
      )
      .then((response) => {
        commit('setScreenshots', response)
      })
  },

  removeScreenshot({ state, commit }, { keyId, screenshotId }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$delete(
        `/api/v1/projects/${projectId}/keys/${keyId}/screenshots/${screenshotId}`
      )
      .then(() => {
        commit('removeScreenshot', {
          keyId,
          screenshotId
        })
      })
  },

  // words
  createWord({ state, commit }, { keyId, body }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$post(`/api/v1/projects/${projectId}/keys/${keyId}/words`, body)
      .then((word) => {
        commit('addWordToKey', word)
      })
  },

  updateWord({ state, commit }, { keyId, wordId, body }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$put(`/api/v1/projects/${projectId}/keys/${keyId}/words/${wordId}`, body)
      .then((word) => {
        commit('updateWordById', word)
      })
  },

  // members
  addMember({ state, commit }, { email, role }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$post(`/api/v1//projects/${projectId}/members`, {
        email,
        role
      })
      .then((member) => {
        commit('addMember', member)
      })
  },

  removeMember({ state, commit }, { memberId }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$delete(`/api/v1//projects/${projectId}/members/${memberId}`)
      .then(() => {
        commit('removeMember', memberId)
      })
  },

  updateMemberRole({ state, commit }, { memberId, role }) {
    const projectId = state.openedProject.id
    return this.$axios
      .$put(`/api/v1/projects/${projectId}/members/${memberId}`, {
        role
      })
      .then(({ role }) => {
        commit('setMemberRole', {
          memberId,
          role
        })
      })
  }
}
