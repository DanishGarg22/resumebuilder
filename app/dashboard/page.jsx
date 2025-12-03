"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/lib/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Trash2, Edit2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [resumes, setResumes] = useState([])
  const [loadingResumes, setLoadingResumes] = useState(true)
  const [newTitle, setNewTitle] = useState("")
  const [creatingResume, setCreatingResume] = useState(false)

  useEffect(() => {
    if (loading || !user) return

    const fetchResumes = async () => {
      try {
        const res = await fetch(`/api/resumes?userId=${user.id}`)
        const data = await res.json()
        if (res.ok) {
          setResumes(data.resumes || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching resumes:", error)
      } finally {
        setLoadingResumes(false)
      }
    }

    fetchResumes()
  }, [user, loading])

  const handleCreateResume = async () => {
    if (!newTitle.trim()) return

    setCreatingResume(true)
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: newTitle,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setResumes([...resumes, data.resume])
        setNewTitle("")
        router.push(`/editor/${data.resume.id}`)
      }
    } catch (error) {
      console.error("[v0] Error creating resume:", error)
    } finally {
      setCreatingResume(false)
    }
  }

  const handleDeleteResume = async (resumeId) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setResumes(resumes.filter((r) => r.id !== resumeId))
      }
    } catch (error) {
      console.error("[v0] Error deleting resume:", error)
    }
  }

  if (loading || loadingResumes) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container h-16 flex items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Resume Builder
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.firstName}</span>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Resumes</h1>
          <p className="text-muted-foreground">Create and manage your professional resumes</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8 glass-effect">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Create New Resume</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter resume title (e.g., Software Engineer Resume)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleCreateResume()
              }}
            />
            <Button onClick={handleCreateResume} disabled={creatingResume || !newTitle.trim()} className="gap-2">
              <Plus className="w-4 h-4" />
              {creatingResume ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="p-12 text-center bg-input border border-dashed border-border rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first resume to get started building your professional profile.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-card border border-border rounded-lg p-6 glass-effect hover:border-primary/50 transition-smooth"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2">{resume.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => router.push(`/editor/${resume.id}`)} size="sm" className="flex-1 gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => router.push(`/preview/${resume.id}`)}
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteResume(resume.id)}
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
