import { userStore } from "@/app/lib/storage"
import { generateToken } from "@/app/lib/auth"
import { rateLimitMiddleware, addSecurityHeaders, validateInput } from "@/app/lib/security"

export async function POST(req) {
  const rateLimit = rateLimitMiddleware(req)
  if (rateLimit.blocked) {
    const response = Response.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    return addSecurityHeaders(response)
  }

  try {
    const { email, password, firstName, lastName } = await req.json()

    if (
      !validateInput(email, "email") ||
      !validateInput(password, "password") ||
      !validateInput(firstName) ||
      !validateInput(lastName)
    ) {
      return Response.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    // Check if user already exists
    if (userStore.findByEmail(email)) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    // Create new user (in production, hash password with bcrypt)
    const user = userStore.create({
      email,
      password, // WARNING: Store hashed passwords in production
      firstName,
      lastName,
    })

    const token = generateToken(user.id)

    const response = Response.json(
      {
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
        token,
      },
      { status: 201 },
    )
    return addSecurityHeaders(response)
  } catch (error) {
    return Response.json({ error: "Sign up failed" }, { status: 500 })
  }
}
