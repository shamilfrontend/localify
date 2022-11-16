import JwtDecode from 'jwt-decode'

const isValidToken = (token) => {
  if (!token) return false

  const jwtData = JwtDecode(token) || {}

  const expires = jwtData.exp || 0

  return new Date().getTime() / 1000 < expires
}

export default isValidToken
