module.exports = async (req, res) => {
  const projectId = Number(req.params.projectId)
  const memberId = Number(req.params.memberId)
  const { role } = req.body

  try {
    const member = await req.db.Member.findOne({
      where: {
        project_id: projectId,
        user_id: memberId
      }
    })

    member.role = role
    await member.save()

    const members = await req.project.getUsers()
    const foundMember = members.find((member) => member.id === memberId)

    res.status(200).json({
      role: foundMember.Member.role
    })
  } catch (e) {
    console.log('updateRole -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
