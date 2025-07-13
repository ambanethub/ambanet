"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, FileText, Shield, Search, UserCheck, UserX, Trash2, Edit, Eye } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "researcher" | "public"
  institution?: string
  country?: string
  joinDate: string
  status: "active" | "suspended"
  researchCount: number
  projectCount: number
}

interface AdminResearch {
  id: string
  title: string
  author: string
  uploadDate: string
  status: "approved" | "pending" | "rejected"
  downloads: number
  isPublic: boolean
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalResearch: number
  pendingResearch: number
  totalProjects: number
  activeProjects: number
}

export function AdminPanel() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [users, setUsers] = useState<AdminUser[]>([])
  const [research, setResearch] = useState<AdminResearch[]>([])
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalResearch: 0,
    pendingResearch: 0,
    totalProjects: 0,
    activeProjects: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  useEffect(() => {
    if (user?.role !== "admin") return

    const fetchAdminData = async () => {
      setLoading(true)
      try {
        const [usersRes, researchRes, statsRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/research"),
          fetch("/api/admin/stats"),
        ])
        const usersData = await usersRes.json()
        const researchData = await researchRes.json()
        const statsData = await statsRes.json()

        setUsers(usersData)
        setResearch(researchData)
        setStats(statsData)
      } catch (error) {
        toast({
          title: "Error fetching admin data",
          description: "Could not load data for the admin panel.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [user])

  const handleUserAction = (userId: string, action: "suspend" | "activate" | "delete") => {
    setUsers((prev) =>
      prev
        .map((user) => {
          if (user.id === userId) {
            if (action === "suspend") {
              return { ...user, status: "suspended" as const }
            } else if (action === "activate") {
              return { ...user, status: "active" as const }
            }
          }
          return user
        })
        .filter((user) => action !== "delete" || user.id !== userId),
    )

    toast({
      title: "User action completed",
      description: `User has been ${action}d successfully.`,
    })
  }

  const handleResearchAction = (researchId: string, action: "approve" | "reject") => {
    setResearch((prev) =>
      prev.map((item) =>
        item.id === researchId
          ? { ...item, status: action === "approve" ? ("approved" as const) : ("rejected" as const) }
          : item,
      ),
    )

    toast({
      title: "Research action completed",
      description: `Research has been ${action}d successfully.`,
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  if (user?.role !== "admin") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600">You need administrator privileges to access this panel.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage users, research, and system settings</p>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Research</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalResearch}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Research</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingResearch}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
              <Users className="h-8 w-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="research">Research Moderation</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{user.name}</h4>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                        <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        {user.institution} • {user.country} • Joined {user.joinDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.researchCount} research papers • {user.projectCount} projects
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.status === "active" ? (
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "suspend")}>
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "activate")}>
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, "delete")}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {research.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge
                          variant={
                            item.status === "approved"
                              ? "default"
                              : item.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                        {item.isPublic && <Badge variant="outline">Public</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">By {item.author}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded {item.uploadDate} • {item.downloads} downloads
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleResearchAction(item.id, "approve")}>
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleResearchAction(item.id, "reject")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
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
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Platform Configuration</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Auto-approve research uploads</Label>
                        <p className="text-sm text-gray-600">
                          Automatically approve research papers from verified researchers
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Public registration</Label>
                        <p className="text-sm text-gray-600">Allow public users to register without approval</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email notifications</Label>
                        <p className="text-sm text-gray-600">Send system-wide email notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline">Export User Data</Button>
                    <Button variant="outline">Export Research Data</Button>
                    <Button variant="outline">Generate System Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
