module.exports = async (req, res) => {
  const { name, description, languages } = req.body

  try {
    const project = await req.db.Project.create({
      name,
      description
    })

    const langs = []
    for (const languageId of languages) {
      const pLanguage = await req.db.Language.findByPk(languageId)
      langs.push(pLanguage)
    }
    project.setLanguages(langs)

    await req.user.addProject(project, {
      through: {
        role: 0
      }
    })

    const sourceLanguages = await project.getLanguages()
    const members = await project.getUsers()

    res.status(200).json({
      id: project.id,
      name: project.name,
      description: project.description,
      members: members.map((member) => ({
        id: member.id,
        name: member.name,
        shortName: member.name && member.name.slice(0, 2).toUpperCase()
      })),
      languages: sourceLanguages.map((language) => ({
        id: language.id,
        code: language.code,
        name: language.name,
        progress: 0,
        quantityKeys: 0,
        translated: 0
      }))
    })
  } catch (e) {
    console.log('createProject ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
