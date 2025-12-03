// Simulated storage for demonstration - Replace with MongoDB in production
const users = new Map()
const resumes = new Map()
const loginAttempts = new Map()

export const userStore = {
  create: (userData) => {
    const id = Date.now().toString()
    const user = {
      id,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    users.set(id, user)
    return user
  },
  findByEmail: (email) => {
    for (const user of users.values()) {
      if (user.email === email) return user
    }
    return null
  },
  findById: (id) => users.get(id),
  update: (id, userData) => {
    const user = users.get(id)
    if (!user) return null
    const updated = {
      ...user,
      ...userData,
      updatedAt: new Date().toISOString(),
    }
    users.set(id, updated)
    return updated
  },
}

export const resumeStore = {
  create: (userId, resumeData) => {
    const id = Date.now().toString()
    const resume = {
      id,
      userId,
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    resumes.set(id, resume)
    return resume
  },
  findById: (id) => resumes.get(id),
  findByUserId: (userId) => {
    const userResumes = []
    for (const resume of resumes.values()) {
      if (resume.userId === userId) userResumes.push(resume)
    }
    return userResumes
  },
  update: (id, resumeData) => {
    const resume = resumes.get(id)
    if (!resume) return null
    const updated = {
      ...resume,
      ...resumeData,
      updatedAt: new Date().toISOString(),
    }
    resumes.set(id, updated)
    return updated
  },
  delete: (id) => {
    return resumes.delete(id)
  },
}

export const trackLoginAttempt = (email) => {
  const key = `attempts_${email}`
  const attempts = loginAttempts.get(key) || []
  const now = Date.now()
  const recentAttempts = attempts.filter((time) => now - time < 15 * 60 * 1000) // 15 minutes

  if (recentAttempts.length >= 5) {
    return { blocked: true, attempts: recentAttempts.length }
  }

  recentAttempts.push(now)
  loginAttempts.set(key, recentAttempts)
  return { blocked: false, attempts: recentAttempts.length }
}

export const clearLoginAttempts = (email) => {
  const key = `attempts_${email}`
  loginAttempts.delete(key)
}
