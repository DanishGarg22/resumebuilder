"use client"

interface PersonalData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zipCode: string
  summary: string
}

interface PersonalSectionProps {
  data: PersonalData
  onChange: (data: PersonalData) => void
}

export function PersonalSection({ data, onChange }: PersonalSectionProps) {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="resume-section">
      <div className="section-title">
        <span>👤</span> Personal Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your city"
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your country"
            value={data.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your zip code"
            value={data.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea h-24"
          placeholder="Brief summary about yourself..."
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
      </div>
    </div>
  )
}
