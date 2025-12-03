"use client"

import { useState } from "react"

interface ExportModalProps {
  isOpen: boolean
  resumeId: string
  onClose: () => void
}

export function ExportModal({ isOpen, resumeId, onClose }: ExportModalProps) {
  const [exporting, setExporting] = useState(false)

  if (!isOpen) return null

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/resumes/${resumeId}/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ format: "pdf" }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${Date.now()}.pdf`
        a.click()
        onClose()
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setExporting(false)
    }
  }

  const handleExportDOCX = async () => {
    setExporting(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/resumes/${resumeId}/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ format: "docx" }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `resume-${Date.now()}.docx`
        a.click()
        onClose()
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-foreground mb-4">Export Resume</h2>
        <p className="text-muted-foreground mb-6">Choose your export format:</p>

        <div className="space-y-3">
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth font-medium disabled:opacity-50"
          >
            {exporting ? "Exporting..." : "Export as PDF"}
          </button>
          <button
            onClick={handleExportDOCX}
            disabled={exporting}
            className="w-full px-4 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-md transition-smooth font-medium disabled:opacity-50"
          >
            {exporting ? "Exporting..." : "Export as DOCX"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-md transition-smooth"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
