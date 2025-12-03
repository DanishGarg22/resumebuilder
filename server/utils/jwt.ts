import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "your-secret-key"
const EXPIRY = "7d"

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRY })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return null
  }
}
