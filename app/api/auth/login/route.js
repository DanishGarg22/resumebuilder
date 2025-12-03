import { userStore, trackLoginAttempt, clearLoginAttempts } from "@/app/lib/storage"
import { generateToken } from "@/app/lib/auth"
import { rateLimitMiddleware, addSecurityHeaders, validateInput } from "@/app/lib/security"

export async function POST(req) {
  const rateLimit = rateLimitMiddleware(req)
  if (rateLimit.blocked) {
    const response = Response.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    return addSecurityHeaders(response)
  }

  try {
    const { email, password } = await req.json()

    if (!validateInput(email, "email") || !validateInput(password, "password")) {
      return Response.json({ error: "Invalid email or password format" }, { status: 400 })
    }

    // Check brute force
    const attempt = trackLoginAttempt(email)
    if (attempt.blocked) {
      return Response.json({ error: "Too many login attempts. Try again later." }, { status: 429 })
    }

    // Find user
    const user = userStore.findByEmail(email)
    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    clearLoginAttempts(email)
    const token = generateToken(user.id)

    const response = Response.json(
      {
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
        token,
      },
      { status: 200 },
    )
    return addSecurityHeaders(response)
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
