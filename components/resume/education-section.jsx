"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"

export function EducationSection({ data, onChange }) {
  const [education, setEducation] = useState(data || [])

  const handleAdd = () => {
    const newEducation = [
      ...education,
      {
        id: Date.now(),
        school: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        details: "",
      },
    ]
    setEducation(newEducation)
    onChange(newEducation)
  }

  const handleUpdate = (id, field, value) => {
    const updated = education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    setEducation(updated)
    onChange(updated)
  }

  const handleRemove = (id) => {
    const updated = education.filter((edu) => edu.id !== id)
    setEducation(updated)
    onChange(updated)
  }

  return (
    <div className="resume-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title m-0">Education</h2>
        <Button onClick={handleAdd} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu) => (
        <div key={edu.id} className="p-4 bg-input border border-border rounded-lg mb-4 relative">
          <button
            onClick={() => handleRemove(edu.id)}
            className="absolute top-3 right-3 p-1 hover:bg-destructive/10 rounded"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label">School/University</label>
              <Input
                placeholder="University Name"
                value={edu.school}
                onChange={(e) => handleUpdate(edu.id, "school", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <Input
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <Input
                placeholder="Computer Science"
                value={edu.field}
                onChange={(e) => handleUpdate(edu.id, "field", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <Input
                type="number"
                placeholder="2023"
                value={edu.endYear}
                onChange={(e) => handleUpdate(edu.id, "endYear", e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Additional Details</label>
            <Textarea
              placeholder="GPA, relevant coursework, achievements..."
              value={edu.details}
              onChange={(e) => handleUpdate(edu.id, "details", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="p-8 text-center bg-input/50 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  )
}
