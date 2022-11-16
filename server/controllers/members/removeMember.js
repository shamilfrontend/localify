module.exports = async (req, res) => {
  const projectId = Number(req.params.projectId)
  const memberId = Number(req.params.memberId)

  try {
    const project = await req.db.Project.findByPk(projectId)

    const [user] = await project.getUsers({
      where: {
        id: memberId
      }
    })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    await user.Member.destroy()
    res.status(204).send()
  } catch (e) {
    console.log('removeMember -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
