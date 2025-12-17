import { verifyToken } from "../utils/jwt.js"
import { users } from "../controllers/usercontroller.js"

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  try {
    
    const decoded = verifyToken(token)

    const user = users.find(u => u.id === decoded.id)
    if (!user) {
      return res.status(401).json({ error: "User not found" })
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" })
  }
}
