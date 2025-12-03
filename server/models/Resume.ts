import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "My Resume",
    },
    template: {
      type: String,
      enum: ["modern", "classic", "minimal"],
      default: "modern",
    },
    personal: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      zipCode: String,
      summary: String,
      profileImage: String,
    },
    education: [
      {
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        grade: String,
        activities: String,
        description: String,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        isCurrentlyWorking: Boolean,
        description: String,
        skills: [String],
      },
    ],
    skills: [
      {
        skillName: String,
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        },
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Fluent"],
        },
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        credentialId: String,
        credentialUrl: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export const Resume = mongoose.model("Resume", resumeSchema)
