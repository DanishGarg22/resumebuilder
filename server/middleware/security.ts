import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

// IP Whitelist middleware
export const checkIPWhitelist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const clientIP = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || ""

    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return next()

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "")
    const user = await User.findById(decoded.userId)

    if (user?.allowedIPs && user.allowedIPs.length > 0 && !user.allowedIPs.includes(clientIP)) {
      return res.status(403).json({ error: "Access denied from this IP" })
    }

    next()
  } catch (error) {
    next()
  }
}

// Rate limiting middleware (simple in-memory store)
const loginAttempts = new Map<string, { count: number; timestamp: number }>()

export const rateLimitLogin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const clientIP = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || ""

  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes

  const record = loginAttempts.get(clientIP)

  if (record && now - record.timestamp < windowMs) {
    record.count++
    if (record.count > 5) {
      return res.status(429).json({
        error: "Too many login attempts. Please try again later.",
      })
    }
  } else {
    loginAttempts.set(clientIP, { count: 1, timestamp: now })
  }

  next()
}

// JWT Authentication middleware
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" })
  }
}

// CORS and headers security
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("X-Frame-Options", "DENY")
  res.setHeader("X-XSS-Protection", "1; mode=block")
  res.setHeader("Strict-Transport-Security", "max-age=31536000")
  next()
}
