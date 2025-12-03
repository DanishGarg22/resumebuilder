"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoSection({ data, onChange }) {
  return (
    <div className="resume-section">
      <h2 className="section-title">Personal Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <Input
            type="text"
            placeholder="John"
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <Input
            type="text"
            placeholder="Doe"
            value={data.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <Input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <Input
            type="text"
            placeholder="New York, NY"
            value={data.location || ""}
            onChange={(e) => onChange("location", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website/Portfolio</label>
          <Input
            type="url"
            placeholder="https://example.com"
            value={data.website || ""}
            onChange={(e) => onChange("website", e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <Textarea
          placeholder="Brief summary about yourself..."
          value={data.summary || ""}
          onChange={(e) => onChange("summary", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
