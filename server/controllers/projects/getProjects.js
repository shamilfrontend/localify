module.exports = async (req, res) => {
  try {
    const projects = await req.user.getProjects({
      order: [['id', 'DESC']]
    })

    const response = []

    for (const project of projects) {
      const keys = []

      for (const key of await project.getTKeys()) {
        const words = await key.getTWords()

        keys.push({
          id: key.id,
          words
        })
      }

      const sourceLanguages = await project.getLanguages()
      const members = await project.getUsers()

      const languages = sourceLanguages.map((language) => {
        const translated = keys.reduce((acc, key) => {
          const filteredWords = key.words
            .filter((word) => word.value)
            .filter((word) => word.LanguageId === language.id)
          return acc + filteredWords.length
        }, 0)

        return {
          id: language.id,
          code: language.code,
          name: language.name,
          progress: Math.floor((translated * 100) / keys.length) || 0,
          quantityKeys: keys.length,
          translated
        }
      })

      response.push({
        id: project.id,
        name: project.name,
        description: project.description,
        members: members.map((member) => ({
          id: member.id,
          name: member.name,
          shortName: member.name && member.name.slice(0, 2).toUpperCase(),
          color: member.color
        })),
        languages
      })
    }

    res.status(200).json(response)
  } catch (e) {
    console.log('getProjects ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
