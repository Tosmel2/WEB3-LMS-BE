import jwt from 'jsonwebtoken'
import expressjwt from 'express-jwt'
import User from '../model/User.js'

const JWT_SECRET = 'secret_key'

// Generate JWT token
export function generateToken(user) {
  const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  })
  return token
}

// Authenticate JWT token
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({ message: 'Access denied. Token required.' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' })
    }
    req.user = decoded
    next()
  })
}

// Authorize user by role
export  function authorizeRole(role) {
  return (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message })
      }
      if (!user || user.role !== role) {
        return res
          .status(403)
          .json({ message: 'Access denied. ' + role + ' role required.' })
      }
      next()
    })
  }
}
// Define admin middleware
export  function adminMiddleware(req, res, next) {
  if (req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' })
  }
}

// module.exports = {
//   generateToken,
//   authenticateToken,
//   authorizeRole,
//   adminMiddleware,
// }
