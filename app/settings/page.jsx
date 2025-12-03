"use client"
import { useState } from "react"
import { useAuth } from "@/app/lib/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [whitelistedIPs, setWhitelistedIPs] = useState([])
  const [newIP, setNewIP] = useState("")
  const [saving, setSaving] = useState(false)

  const handleAddIP = async () => {
    if (!newIP.trim()) return

    setSaving(true)
    // In production, send to API
    setWhitelistedIPs([...whitelistedIPs, { ip: newIP, addedAt: new Date().toISOString() }])
    setNewIP("")
    setSaving(false)
  }

  const handleRemoveIP = (ip) => {
    setWhitelistedIPs(whitelistedIPs.filter((entry) => entry.ip !== ip))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container h-16 flex items-center gap-4 px-4">
          <Button onClick={() => router.back()} size="sm" variant="ghost">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </header>

      <div className="container py-8 px-4 max-w-2xl">
        {/* Account Settings */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 glass-effect">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Name</label>
              <div className="flex gap-2">
                <Input type="text" value={user?.firstName || ""} disabled placeholder="First Name" />
                <Input type="text" value={user?.lastName || ""} disabled placeholder="Last Name" />
              </div>
            </div>
            <div>
              <label className="form-label">Email</label>
              <Input type="email" value={user?.email || ""} disabled placeholder="Email" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 glass-effect">
          <h2 className="text-lg font-semibold text-foreground mb-4">Security Settings</h2>

          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">IP Whitelist</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Restrict account access to specific IP addresses for enhanced security.
            </p>

            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Enter IP address (e.g., 192.168.1.1)"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
              />
              <Button onClick={handleAddIP} disabled={saving || !newIP.trim()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add IP
              </Button>
            </div>

            {whitelistedIPs.length > 0 ? (
              <div className="space-y-2">
                {whitelistedIPs.map((entry) => (
                  <div
                    key={entry.ip}
                    className="flex items-center justify-between p-3 bg-input border border-border rounded"
                  >
                    <div>
                      <p className="font-medium text-foreground">{entry.ip}</p>
                      <p className="text-xs text-muted-foreground">
                        Added {new Date(entry.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleRemoveIP(entry.ip)}
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-input/50 rounded border border-dashed border-border text-center">
                <p className="text-sm text-muted-foreground">No IP addresses whitelisted yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="bg-card border border-border rounded-lg p-6 glass-effect">
          <h2 className="text-lg font-semibold text-foreground mb-4">Logout</h2>
          <Button
            onClick={logout}
            variant="outline"
            className="text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </div>
    </main>
  )
}
