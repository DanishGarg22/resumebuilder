"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/useAuth"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit2 } from "lucide-react"
import { ResumeTemplate } from "@/components/resume/resume-template"
import { ExportButton } from "@/components/resume/export-button"

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [resume, setResume] = useState(null)
  const [loadingResume, setLoadingResume] = useState(true)

  useEffect(() => {
    if (loading || !user) return

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes/${params.id}`)
        const data = await res.json()
        if (res.ok) {
          setResume(data.resume)
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("[v0] Error fetching resume:", error)
        router.push("/dashboard")
      } finally {
        setLoadingResume(false)
      }
    }

    fetchResume()
  }, [params.id, user, loading, router])

  if (loading || loadingResume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading resume...</div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Resume not found</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button onClick={() => router.back()} size="sm" variant="ghost">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">{resume.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <ExportButton resume={resume} />
            <Button onClick={() => router.push(`/editor/${params.id}`)} variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 px-4">
        <div id="resume-preview" className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ResumeTemplate resume={resume} />
        </div>
      </div>
    </main>
  )
}
