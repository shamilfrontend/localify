const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const config = require('../config')

const GOOGLE_CLIENT_ID =
  '546578775198-39vftfgrq79gsee6pnji2ictphhv0jun.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'uwVjJ8-r_yjkIvBCGKW_lMIz'

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${config.BASE_URL}/api/v1/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)
