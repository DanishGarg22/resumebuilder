"use client"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

export function ResumeTemplate({ resume }) {
  const { personalInfo, experience, education, skills, projects } = resume

  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold">
          {personalInfo?.firstName} {personalInfo?.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
                {personalInfo.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Work Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate}
                  {exp.endDate && ` - ${exp.endDate}`}
                  {exp.currentlyWorking && " - Present"}
                </span>
              </div>
              <p className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.field} - {edu.school}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{edu.endYear}</span>
              </div>
              {edu.details && <p className="text-sm mt-2 text-gray-700">{edu.details}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-200 rounded text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3">Projects</h2>
          {projects.map((project, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{project.name}</h3>
                  {project.technologies && <p className="text-sm text-gray-600">{project.technologies}</p>}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    View
                  </a>
                )}
              </div>
              {project.description && <p className="text-sm mt-2 text-gray-700">{project.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
