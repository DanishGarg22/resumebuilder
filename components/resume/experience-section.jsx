"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"

export function ExperienceSection({ data, onChange }) {
  const [experience, setExperience] = useState(data || [])

  const handleAdd = () => {
    const newExperience = [
      ...experience,
      {
        id: Date.now(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]
    setExperience(newExperience)
    onChange(newExperience)
  }

  const handleUpdate = (id, field, value) => {
    const updated = experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    setExperience(updated)
    onChange(updated)
  }

  const handleRemove = (id) => {
    const updated = experience.filter((exp) => exp.id !== id)
    setExperience(updated)
    onChange(updated)
  }

  return (
    <div className="resume-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title m-0">Work Experience</h2>
        <Button onClick={handleAdd} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.map((exp) => (
        <div key={exp.id} className="p-4 bg-input border border-border rounded-lg mb-4 relative">
          <button
            onClick={() => handleRemove(exp.id)}
            className="absolute top-3 right-3 p-1 hover:bg-destructive/10 rounded"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label">Company</label>
              <Input
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <Input
                placeholder="Job Title"
                value={exp.position}
                onChange={(e) => handleUpdate(exp.id, "position", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <Input
                type="month"
                value={exp.endDate}
                disabled={exp.currentlyWorking}
                onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id={`current-${exp.id}`}
              checked={exp.currentlyWorking}
              onChange={(e) => handleUpdate(exp.id, "currentlyWorking", e.target.checked)}
            />
            <label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">
              Currently working here
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Job Description</label>
            <Textarea
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
              rows={4}
            />
          </div>
        </div>
      ))}

      {experience.length === 0 && (
        <div className="p-8 text-center bg-input/50 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  )
}
