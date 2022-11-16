module.exports = async (req, res) => {
  try {
    const keys = []

    for (const key of await req.project.getTKeys()) {
      const screenshots = await key.getScreenshots()
      const words = await key.getTWords()
      const comments = await key.getComments()

      keys.push({
        id: key.id,
        name: key.name,
        description: key.description,
        projectId: key.ProjectId,
        screenshots,
        words,
        comments
      })
    }

    const languages = await req.project.getLanguages()
    const members = await req.project.getUsers()

    const completedWords = keys.reduce((acc, key) => {
      const filteredWords = key.words.filter((word) => word.value)

      if (filteredWords.length) {
        filteredWords.forEach((word) => {
          acc.push(word)
        })
      }

      return acc
    }, [])

    res.status(200).json({
      id: req.project.id,
      name: req.project.name,
      description: req.project.description,
      members: members.map((member) => ({
        memberId: member.id,
        name: member.name,
        email: member.email,
        color: member.color,
        role: member.Member.role
      })),
      languages: languages.map(({ id, name, code }) => ({
        id,
        name,
        code,
        quantityWords: keys.length,
        quantityCompletedWords: completedWords.filter(
          (word) => word.LanguageId === id
        ).length
      })),
      keys: keys.map((key) => ({
        id: key.id,
        name: key.name,
        description: key.description,
        quantityComments: key.comments.length,
        projectId: key.ProjectId,
        screenshots: key.screenshots.map((screenshot) => ({
          id: screenshot.id,
          path: screenshot.path,
          keyId: screenshot.TKeyId
        })),
        words: key.words.map((word) => ({
          id: word.id,
          keyId: word.TKeyId,
          languageId: word.LanguageId,
          value: word.value
        }))
      }))
    })
  } catch (e) {
    console.log('getProjectById ------', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
