const jwt = require("jsonwebtoken")

const Authorization = ( req, res, next ) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({message: 'Token not provided'})
  }

  token = token.split(' ')[1]

  
  jwt.verify(token, 'lmknjbhvg', (err, decoded) => {
    if(err) {
      return res.status(401).json({message: err.message})
    }

    req.user = decoded
    next()
  })
}


const AuthorizationSuperAdmin = ( req, res, next ) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({message: 'Token not provided'})
  }

  token = token.split(' ')[1]

  jwt.verify(token, 'qawsedrft', (err, decoded) => {
    if(err) {
      return res.status(401).json({message: err.message})
    }

    req.user = decoded
    next()
  })
}

module.exports = { Authorization, AuthorizationSuperAdmin }