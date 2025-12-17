import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import { users } from "../controllers/usercontroller"

const SALT_ROUNDS = 10

// Register a new user
export const registerUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = {
    id: uuid(),
    email,
    passwordHash,
    role: "user"
  }

  users.push(newUser)

  // Return safe user object
  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role
  }
}

// Login an existing user
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  const user = users.find(u => u.email === email)
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    throw new Error("Invalid credentials")
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role
  }
}
