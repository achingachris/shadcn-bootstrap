"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Mail, MessageSquare, Shield, Trash2, AlertTriangle } from "lucide-react"
import { mockUserProfile } from "@/lib/user-data"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(mockUserProfile.preferences.notifications)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const handleNotificationChange = (type: keyof typeof notifications, value: boolean) => {
    setNotifications({ ...notifications, [type]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified about events and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive event updates and reminders via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => handleNotificationChange("email", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Get important updates via text message</p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => handleNotificationChange("push", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your privacy settings and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Change Email Address
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Shield className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <MessageSquare className="h-4 w-4 mr-2" />
            Download My Data
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showDeleteAlert && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from
                our servers.
              </AlertDescription>
            </Alert>
          )}
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => setShowDeleteAlert(!showDeleteAlert)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
          {showDeleteAlert && (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteAlert(false)}>
                Cancel
              </Button>
              <Button variant="destructive">I understand, delete my account</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
