"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"

export function SkillsSection({ data, onChange }) {
  const [skills, setSkills] = useState(data || [])
  const [skillInput, setSkillInput] = useState("")

  const handleAdd = () => {
    if (skillInput.trim()) {
      const newSkills = [...skills, { id: Date.now(), name: skillInput, level: "Intermediate" }]
      setSkills(newSkills)
      onChange(newSkills)
      setSkillInput("")
    }
  }

  const handleRemove = (id) => {
    const updated = skills.filter((skill) => skill.id !== id)
    setSkills(updated)
    onChange(updated)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="resume-section">
      <h2 className="section-title">Skills</h2>

      <div className="form-group flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Add a skill (e.g., React, Project Management)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleAdd} variant="default">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary rounded-full"
          >
            <span className="text-sm font-medium text-primary">{skill.name}</span>
            <button onClick={() => handleRemove(skill.id)} className="ml-1 hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="p-4 text-center bg-input/50 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground text-sm">Add skills to showcase your expertise</p>
        </div>
      )}
    </div>
  )
}
