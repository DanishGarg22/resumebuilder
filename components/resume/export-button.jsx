"use client"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import html2pdf from "html2pdf.js"

export function ExportButton({ resume }) {
  const handleExportPDF = () => {
    const element = document.getElementById("resume-preview")
    const fileName = `${resume.personalInfo?.firstName}_${resume.personalInfo?.lastName}_Resume.pdf`

    const options = {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    }

    html2pdf().set(options).from(element).save()
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resume, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${resume.personalInfo?.firstName}_resume.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleExportPDF} className="gap-2">
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
      <Button onClick={handleExportJSON} variant="outline" className="gap-2 bg-transparent">
        <Download className="w-4 h-4" />
        Download JSON
      </Button>
    </div>
  )
}
