module.exports = async (req, res) => {
  const { keys } = req.body

  try {
    const response = []

    for (const key of keys) {
      const newKey = await req.project.createTKey({
        name: key.name,
        description: key.description
      })

      response.push({
        id: newKey.id,
        name: newKey.name,
        description: newKey.description,
        projectId: newKey.ProjectId,
        quantityComments: 0,
        screenshots: [],
        words: []
      })
    }

    res.status(200).json(response)
  } catch (e) {
    console.log('createKeys ------', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
