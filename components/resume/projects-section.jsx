"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"

export function ProjectsSection({ data, onChange }) {
  const [projects, setProjects] = useState(data || [])

  const handleAdd = () => {
    const newProject = [
      ...projects,
      {
        id: Date.now(),
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ]
    setProjects(newProject)
    onChange(newProject)
  }

  const handleUpdate = (id, field, value) => {
    const updated = projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    setProjects(updated)
    onChange(updated)
  }

  const handleRemove = (id) => {
    const updated = projects.filter((proj) => proj.id !== id)
    setProjects(updated)
    onChange(updated)
  }

  return (
    <div className="resume-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title m-0">Projects</h2>
        <Button onClick={handleAdd} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="p-4 bg-input border border-border rounded-lg mb-4 relative">
          <button
            onClick={() => handleRemove(project.id)}
            className="absolute top-3 right-3 p-1 hover:bg-destructive/10 rounded"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <Input
                placeholder="Project Title"
                value={project.name}
                onChange={(e) => handleUpdate(project.id, "name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Project Link</label>
              <Input
                type="url"
                placeholder="https://github.com/..."
                value={project.link}
                onChange={(e) => handleUpdate(project.id, "link", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Technologies Used</label>
            <Input
              placeholder="React, Node.js, MongoDB"
              value={project.technologies}
              onChange={(e) => handleUpdate(project.id, "technologies", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <Textarea
              placeholder="What did you build and what was your role?"
              value={project.description}
              onChange={(e) => handleUpdate(project.id, "description", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="p-8 text-center bg-input/50 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No projects added yet. Click "Add Project" to showcase your work.</p>
        </div>
      )}
    </div>
  )
}
