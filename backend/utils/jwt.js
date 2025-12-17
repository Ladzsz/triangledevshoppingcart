import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

export const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  )
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}
