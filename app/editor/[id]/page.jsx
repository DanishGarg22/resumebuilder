"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/useAuth"
import { EditorHeader } from "@/components/resume/editor-header"
import { PersonalInfoSection } from "@/components/resume/personal-info-section"
import { EducationSection } from "@/components/resume/education-section"
import { ExperienceSection } from "@/components/resume/experience-section"
import { SkillsSection } from "@/components/resume/skills-section"
import { ProjectsSection } from "@/components/resume/projects-section"

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [resume, setResume] = useState(null)
  const [saving, setSaving] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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
      }
    }

    fetchResume()
  }, [params.id, user, loading, router])

  const handleFieldChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSaving(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/resumes/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      })

      if (res.ok) {
        setSaving(false)
      }
    } catch (error) {
      console.error("[v0] Error saving resume:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push(`/preview/${params.id}`)
  }

  if (loading || !resume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading resume...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <EditorHeader
        title={resume.title || "Untitled Resume"}
        onTitleChange={(value) => handleFieldChange("title", value)}
        onSave={handleSave}
        onPreview={handlePreview}
        isSaving={isSaving}
      />

      <div className="container py-8 px-4 max-w-4xl">
        <PersonalInfoSection
          data={resume.personalInfo || {}}
          onChange={(value) => handleFieldChange("personalInfo", value)}
        />

        <ExperienceSection
          data={resume.experience || []}
          onChange={(value) => handleFieldChange("experience", value)}
        />

        <EducationSection data={resume.education || []} onChange={(value) => handleFieldChange("education", value)} />

        <SkillsSection data={resume.skills || []} onChange={(value) => handleFieldChange("skills", value)} />

        <ProjectsSection data={resume.projects || []} onChange={(value) => handleFieldChange("projects", value)} />
      </div>
    </main>
  )
}
