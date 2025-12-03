import { resumeStore } from "@/app/lib/storage"

export async function GET(req, { params }) {
  try {
    const resume = resumeStore.findById(params.id)

    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 })
    }

    return Response.json({ resume }, { status: 200 })
  } catch (error) {
    return Response.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json()
    const resume = resumeStore.update(params.id, data)

    if (!resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 })
    }

    return Response.json({ resume }, { status: 200 })
  } catch (error) {
    return Response.json({ error: "Failed to update resume" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const success = resumeStore.delete(params.id)

    if (!success) {
      return Response.json({ error: "Resume not found" }, { status: 404 })
    }

    return Response.json({ message: "Resume deleted" }, { status: 200 })
  } catch (error) {
    return Response.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
