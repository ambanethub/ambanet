"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, FileText, Users, Download, Eye, Edit, Save, AlertTriangle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface UserStats {
  researchUploads: number
  projectsJoined: number
  projectsLed: number
  totalDownloads: number
}

interface NotificationSettings {
  emailAlerts: boolean
  projectUpdates: boolean
  researchNotifications: boolean
  weeklyDigest: boolean
}

interface UserActivity {
  id: string
  type: "upload" | "join" | "download" | "comment"
  title: string
  description: string
  date: string
}

export function UserDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [stats, setStats] = useState<UserStats>({
    researchUploads: 0,
    projectsJoined: 0,
    projectsLed: 0,
    totalDownloads: 0,
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAlerts: true,
    projectUpdates: true,
    researchNotifications: false,
    weeklyDigest: true,
  })

  const [activities, setActivities] = useState<UserActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    institution: user?.institution || "",
    country: user?.country || "",
    bio: "",
    expertise: "",
  })

  useEffect(() => {
    if (!user) return

    // Simulate fetching user data
    const fetchUserData = async () => {
      setLoading(true)

      // Mock user stats
      const mockStats: UserStats = {
        researchUploads: 5,
        projectsJoined: 3,
        projectsLed: 1,
        totalDownloads: 234,
      }

      // Mock user activities
      const mockActivities: UserActivity[] = [
        {
          id: "1",
          type: "upload",
          title: "Uploaded research paper",
          description: "Climate Change Impacts on Agricultural Productivity",
          date: "2024-01-15",
        },
        {
          id: "2",
          type: "join",
          title: "Joined project",
          description: "Drought Early Warning System for Sahel",
          date: "2024-01-12",
        },
        {
          id: "3",
          type: "download",
          title: "Downloaded research",
          description: "Solar Energy Mapping for Rural Communities",
          date: "2024-01-10",
        },
      ]

      setTimeout(() => {
        setStats(mockStats)
        setActivities(mockActivities)
        setLoading(false)
      }, 1000)
    }

    fetchUserData()
  }, [user])

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simulate profile update
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setEditingProfile(false)
    toast({
      title: "Profile updated successfully!",
      description: "Your profile information has been saved.",
    })
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))

    toast({
      title: "Notification settings updated",
      description: `${key} has been ${value ? "enabled" : "disabled"}.`,
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "join":
        return <Users className="h-4 w-4 text-green-500" />
      case "download":
        return <Download className="h-4 w-4 text-purple-500" />
      case "comment":
        return <Eye className="h-4 w-4 text-orange-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Please sign in</h3>
          <p className="text-gray-600">You need to be signed in to access your dashboard.</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Manage your profile, research, and collaboration activities</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Research Uploads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.researchUploads}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects Joined</p>
                <p className="text-2xl font-bold text-gray-900">{stats.projectsJoined}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects Led</p>
                <p className="text-2xl font-bold text-gray-900">{stats.projectsLed}</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
              </div>
              <Download className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                <Button variant="outline" size="sm" onClick={() => setEditingProfile(!editingProfile)}>
                  {editingProfile ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                  {editingProfile ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={profileData.institution}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, institution: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, country: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    <Input
                      id="expertise"
                      value={profileData.expertise}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, expertise: e.target.value }))}
                      placeholder="Climate Science, Agriculture, Remote Sensing"
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Institution</Label>
                      <p className="text-gray-900">{user.institution || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Country</Label>
                      <p className="text-gray-900">{user.country || "Not specified"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Role</Label>
                    <div className="mt-1">
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Alerts</Label>
                  <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                </div>
                <Switch
                  checked={notifications.emailAlerts}
                  onCheckedChange={(value) => handleNotificationChange("emailAlerts", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Project Updates</Label>
                  <p className="text-sm text-gray-600">Get notified about updates in your projects</p>
                </div>
                <Switch
                  checked={notifications.projectUpdates}
                  onCheckedChange={(value) => handleNotificationChange("projectUpdates", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Research Notifications</Label>
                  <p className="text-sm text-gray-600">Notifications about new research in your areas of interest</p>
                </div>
                <Switch
                  checked={notifications.researchNotifications}
                  onCheckedChange={(value) => handleNotificationChange("researchNotifications", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Weekly Digest</Label>
                  <p className="text-sm text-gray-600">Receive a weekly summary of platform activity</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(value) => handleNotificationChange("weeklyDigest", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
