const bcrypt = require('bcryptjs')
const createToken = require('./createToken')

module.exports = async (req, email) => {
  console.log('email', email)
  const candidate = await req.db.User.findOne({ where: { email } })
  if (!candidate) return false

  const isCorrectPassword = bcrypt.compareSync(
    req.body.password,
    candidate.password
  )
  if (!isCorrectPassword) return false

  candidate.token = createToken(
    candidate.id,
    candidate.email,
    candidate.password
  )
  await candidate.save()

  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    color: candidate.color,
    token: candidate.token
  }
}
