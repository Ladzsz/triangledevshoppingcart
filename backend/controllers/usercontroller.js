import { registerUser, loginUser } from "../services/auth.service.js"
import { signToken } from "../utils/jwt.js"

// Temporary in-memory user store (replace with database queries)
export const users = [{
  id: "uuid",
  email: "user@example.com",
  passwordHash: "hashed",
  role: "user" // or "admin"
}]

// POST /auth/register
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await registerUser({ email, password })
    const token = signToken(user)

    res.status(201).json({
      success: true,
      user,
      token
    })
  } catch (err) {
    next(err)
  }
}

// POST /auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await loginUser({ email, password })
    const token = signToken(user)

    res.json({
      success: true,
      user,
      token
    })
  } catch (err) {
    next(err)
  }
}

// GET /me
export const me = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  })
}
