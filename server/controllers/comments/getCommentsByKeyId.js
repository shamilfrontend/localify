module.exports = async (req, res) => {
  const { keyId } = req.params

  if (!keyId) {
    return res.status(404).json({
      message: 'Передан неверный keyId'
    })
  }

  try {
    const [key] = await req.project.getTKeys({
      where: {
        id: keyId
      }
    })

    const comments = await key.getComments().map((comment) => ({
      id: comment.id,
      userId: comment.UserId,
      keyId: comment.TKeyId,
      message: comment.message,
      createdAt: comment.createdAt
    }))

    const result = []

    for (const comment of comments) {
      const foundUser = await req.db.User.findOne({
        where: {
          id: comment.userId
        }
      })

      if (foundUser) {
        result.push({
          ...comment,
          color: foundUser.color,
          name: foundUser.name
        })
      }
    }

    res.status(200).json(result)
  } catch (e) {
    console.log('getCommentsByKeyId -------', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
