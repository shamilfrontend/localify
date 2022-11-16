const express = require('express')
const passport = require('passport')
require('./middleware/passport-google-oauth20')

const usersRoutes = require('./routes/users')
const googleAuthRoutes = require('./routes/googleAuth')
const languagesRoutes = require('./routes/languages')
const projectsRoutes = require('./routes/projects')
const keysRoutes = require('./routes/keys')
const wordsRoutes = require('./routes/words')
const screenshotsRoutes = require('./routes/screenshots')
const membersRoutes = require('./routes/members')
const commentsRoutes = require('./routes/comments')

// init app
const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/google', googleAuthRoutes)
app.use('/api/v1/languages', languagesRoutes)
app.use('/api/v1/projects', projectsRoutes)
app.use('/api/v1', keysRoutes)
app.use('/api/v1', wordsRoutes)
app.use('/api/v1', screenshotsRoutes)
app.use('/api/v1', membersRoutes)
app.use('/api/v1', commentsRoutes)

module.exports = app
