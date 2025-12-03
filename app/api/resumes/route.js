import { resumeStore } from "@/app/lib/storage"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return Response.json({ error: "User ID required" }, { status: 400 })
    }

    const resumes = resumeStore.findByUserId(userId)
    return Response.json({ resumes }, { status: 200 })
  } catch (error) {
    return Response.json({ error: "Failed to fetch resumes" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { userId, title } = await req.json()

    if (!userId || !title) {
      return Response.json({ error: "User ID and title required" }, { status: 400 })
    }

    const resume = resumeStore.create(userId, {
      title,
      personalInfo: {},
      education: [],
      experience: [],
      skills: [],
      projects: [],
    })

    return Response.json({ resume }, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create resume" }, { status: 500 })
  }
}
