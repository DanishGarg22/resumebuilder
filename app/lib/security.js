const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100
const requestCounts = new Map()

export const rateLimitMiddleware = (req) => {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-client-ip") || "unknown"
  const now = Date.now()

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, [])
  }

  const requests = requestCounts.get(ip)
  const recentRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= MAX_REQUESTS) {
    return {
      blocked: true,
      retryAfter: Math.ceil((Math.max(...recentRequests) + RATE_LIMIT_WINDOW - now) / 1000),
    }
  }

  recentRequests.push(now)
  requestCounts.set(ip, recentRequests)

  return { blocked: false }
}

export const addSecurityHeaders = (response) => {
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  )
  return response
}

export const validateInput = (input, type = "string") => {
  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input)
  }
  if (type === "password") {
    return input && input.length >= 6
  }
  if (type === "string") {
    return input && typeof input === "string" && input.length > 0
  }
  return true
}

export const sanitizeHTML = (str) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return str.replace(/[&<>"']/g, (char) => map[char])
}

export const ipWhitelist = new Set()

export const isIPWhitelisted = (ip) => {
  return ipWhitelist.size === 0 || ipWhitelist.has(ip)
}

export const addIPToWhitelist = (ip) => {
  ipWhitelist.add(ip)
}

export const removeIPFromWhitelist = (ip) => {
  ipWhitelist.delete(ip)
}
