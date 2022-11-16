const bcrypt = require('bcryptjs')
const randomColor = require('randomcolor')
const signIn = require('./signIn')

// const createIntroData = async (req) => {
//   const project = await req.db.Project.create({
//     name: 'test project',
//     description: 'test project description'
//   })
//
//   // add languages
//   const languages = []
//   for (const languageId of [1, 2, 3]) {
//     const pLanguage = await req.db.Language.findByPk(languageId)
//     languages.push(pLanguage)
//   }
//   project.setLanguages(languages)
//
//   // add keys
//   const keysData = [
//     {
//       name: 'welcome',
//       description: 'welcome key description',
//       word: 'Welcome',
//       screenshot: 'intro_data/screenshots/image1.png',
//       languageId: 1
//     },
//     {
//       name: 'app_name',
//       description: 'app name key description',
//       word: 'App name',
//       screenshot: 'intro_data/screenshots/image1.png',
//       languageId: 2
//     }
//   ]
//
//   for (const key of keysData) {
//     const newKey = await project.createTKey({
//       name: key.name,
//       description: key.description
//     })
//
//     if (key.word) {
//       const word = await req.db.TWord.create({
//         value: key.word
//       })
//
//       const language = await req.db.Language.findByPk(key.languageId)
//       await word.setTKey(newKey)
//       await word.setLanguage(language)
//     }
//
//     if (key.screenshot) {
//       await req.db.Screenshot.create({
//         t_key_id: newKey.id,
//         path: key.screenshot
//       })
//     }
//   }
//
//   return project
// }

module.exports = async (req) => {
  const { email } = req.body

  const candidate = await req.db.User.findOne({ where: { email } })
  if (candidate) return { code: 409 }

  const salt = bcrypt.genSaltSync(10)
  const user = await req.db.User.create({
    email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, salt),
    color: randomColor()
  })

  // const project = await createIntroData(req)
  // await user.addProject(project, {
  //   through: {
  //     role: 0
  //   }
  // })
  return await signIn(req, user.email)
}
