import { registerUser, loginUser } from '../services/auth.service.js'
import { signToken } from '../utils/jwt.js'

// register user function
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await registerUser({ email, password })
    const token = signToken(user)

    res.status(201).json({
      success: true,
      user,
      token,
    })
  } catch (err) {
    next(err)
  }
}

// login user function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await loginUser({ email, password })
    const token = signToken(user)

    res.json({
      success: true,
      user,
      token,
    })
  } catch (err) {
    next(err)
  }
}

// GET user function
export const me = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  })
}
