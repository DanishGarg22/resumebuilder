"use client"

interface ResumeData {
  personal: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    zipCode: string
    summary: string
  }
  education: Array<{
    id: string
    school: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    grade: string
  }>
  skills: Array<{
    id: string
    skillName: string
    proficiency: string
  }>
}

interface ResumePreviewProps {
  data: ResumeData
  template?: "modern" | "classic" | "minimal"
}

export function ResumePreview({ data, template = "modern" }: ResumePreviewProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full">
      <div className="flex justify-end gap-4 mb-6 no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth"
        >
          Print to PDF
        </button>
      </div>

      <div className="bg-white text-black p-12 rounded-lg shadow-2xl" style={{ width: "8.5in", margin: "0 auto" }}>
        {/* Header */}
        <div className="mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.personal.fullName}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>•</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.city && <span>•</span>}
            {data.personal.city && (
              <span>
                {data.personal.city}, {data.personal.country}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.personal.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate && new Date(edu.startDate).getFullYear()}
                    {edu.endDate && ` - ${new Date(edu.endDate).getFullYear()}`}
                  </span>
                </div>
                {edu.grade && <p className="text-sm text-gray-600">GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">SKILLS</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-semibold text-gray-900">{skill.skillName}</span>
                  {skill.proficiency && <span className="text-gray-600 ml-2">({skill.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  )
}
