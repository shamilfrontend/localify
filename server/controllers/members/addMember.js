// const nodeMailer = require('nodemailer')
// const sgTransport = require('nodemailer-sendgrid-transport')
// const addMemberTemplate = require('../../emails/addMember')

// const { SEND_GRID_API_KEY } = require('../../config')
// const options = {
//   auth: {
//     api_key: SEND_GRID_API_KEY
//   }
// }

// const mailer = nodeMailer.createTransport(sgTransport(options))

module.exports = async (req, res) => {
  const { email, role } = req.body

  if (!email || !role) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  try {
    const user = await req.db.User.findOne({
      where: {
        email
      }
    })

    await user.addProject(req.project, {
      through: {
        role
      }
    })

    const members = await req.project.getUsers()
    const foundMember = members.find((member) => member.id === user.id)

    res.status(201).json({
      memberId: user.id,
      name: user.name,
      email: user.email,
      color: user.color,
      role: foundMember.Member.role
    })

    // await mailer.sendMail(addMemberTemplate(email, req.project.id))
  } catch (e) {
    console.log('addMember -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
