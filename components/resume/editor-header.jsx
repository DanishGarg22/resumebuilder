"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function EditorHeader({ title, onTitleChange, onSave, onPreview, isSaving }) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-input rounded-md transition-smooth">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg font-semibold border-0 bg-transparent px-0 focus:ring-0"
            placeholder="Untitled Resume"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onSave} disabled={isSaving} size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onPreview} size="sm" variant="outline" className="gap-2 bg-transparent">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>
      </div>
    </header>
  )
}
