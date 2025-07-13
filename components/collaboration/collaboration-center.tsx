"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Users,
  Calendar,
  MapPin,
  Search,
  Filter,
  MessageSquare,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  description: string
  objectives: string[]
  status: "planning" | "active" | "completed"
  leader: string
  participants: string[]
  region: string[]
  tags: string[]
  startDate: string
  endDate: string
  progress: number
  discussionCount: number
  isPublic: boolean
}

interface ProjectRequest {
  id: string
  projectId: string
  userId: string
  userName: string
  userEmail: string
  message: string
  status: "pending" | "approved" | "rejected"
  requestDate: string
}

export function CollaborationCenter() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [requests, setRequests] = useState<ProjectRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all") // Updated default value
  const [selectedRegion, setSelectedRegion] = useState("all") // Updated default value
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching projects
    const fetchProjects = async () => {
      setLoading(true)
      const mockProjects: Project[] = [
        {
          id: "1",
          title: "Drought Early Warning System for Sahel",
          description:
            "Developing an integrated early warning system for drought prediction in the Sahel region using satellite data and machine learning.",
          objectives: [
            "Collect and analyze historical drought data",
            "Develop machine learning prediction models",
            "Create user-friendly dashboard for stakeholders",
            "Train local communities on system usage",
          ],
          status: "active",
          leader: "Dr. Amina Hassan",
          participants: ["Dr. John Okafor", "Prof. Sarah Mwangi", "Dr. Mohamed Ali"],
          region: ["West Africa", "Sahel"],
          tags: ["Drought", "Early Warning", "Machine Learning", "Satellite Data"],
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          progress: 45,
          discussionCount: 23,
          isPublic: true,
        },
        {
          id: "2",
          title: "Solar Energy Mapping for Rural Communities",
          description:
            "Comprehensive mapping of solar energy potential across rural communities in East Africa to support renewable energy development.",
          objectives: [
            "Map solar radiation patterns across target regions",
            "Assess energy needs of rural communities",
            "Identify optimal locations for solar installations",
            "Develop implementation roadmap",
          ],
          status: "planning",
          leader: "Prof. David Kimani",
          participants: ["Dr. Grace Wanjiku", "Dr. Peter Mwangi"],
          region: ["East Africa", "Kenya", "Tanzania"],
          tags: ["Solar Energy", "Rural Development", "Renewable Energy", "Mapping"],
          startDate: "2024-03-01",
          endDate: "2024-11-30",
          progress: 15,
          discussionCount: 8,
          isPublic: true,
        },
        {
          id: "3",
          title: "Climate Adaptation Strategies for Agriculture",
          description:
            "Research and development of climate-resilient agricultural practices for smallholder farmers in Sub-Saharan Africa.",
          objectives: [
            "Study climate impacts on crop yields",
            "Develop drought-resistant crop varieties",
            "Create farmer training programs",
            "Establish demonstration farms",
          ],
          status: "active",
          leader: "Dr. Sarah Johnson",
          participants: ["Prof. John Okafor", "Dr. Mary Ochieng", "Dr. Ahmed Hassan"],
          region: ["Sub-Saharan Africa", "Kenya", "Ghana", "Nigeria"],
          tags: ["Agriculture", "Climate Adaptation", "Food Security", "Smallholder Farmers"],
          startDate: "2023-09-01",
          endDate: "2024-08-31",
          progress: 78,
          discussionCount: 45,
          isPublic: false,
        },
      ]

      const mockRequests: ProjectRequest[] = [
        {
          id: "1",
          projectId: "1",
          userId: "user1",
          userName: "Dr. Lisa Chen",
          userEmail: "lisa.chen@university.edu",
          message:
            "I have extensive experience in satellite data analysis and would like to contribute to this important project.",
          status: "pending",
          requestDate: "2024-01-15",
        },
      ]

      setTimeout(() => {
        setProjects(mockProjects)
        setFilteredProjects(
          mockProjects.filter(
            (p) => p.isPublic || (user && (p.leader === user.name || p.participants.includes(user.name))),
          ),
        )
        setRequests(mockRequests)
        setLoading(false)
      }, 1000)
    }

    fetchProjects()
  }, [user])

  useEffect(() => {
    let filtered = projects.filter(
      (p) => p.isPublic || (user && (p.leader === user.name || p.participants.includes(user.name))),
    )

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((project) => project.region.includes(selectedRegion))
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedStatus, selectedRegion, projects, user])

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create projects.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData(e.currentTarget)
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      objectives: (formData.get("objectives") as string).split("\n").filter((obj) => obj.trim()),
      status: "planning",
      leader: user.name,
      participants: [],
      region: (formData.get("regions") as string).split(",").map((region) => region.trim()),
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      progress: 0,
      discussionCount: 0,
      isPublic: formData.get("isPublic") === "on",
    }

    setProjects((prev) => [newProject, ...prev])
    setCreateDialogOpen(false)

    toast({
      title: "Project created successfully!",
      description: "Your collaboration project has been created.",
    })
  }

  const handleJoinRequest = (projectId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join projects.",
        variant: "destructive",
      })
      return
    }

    const newRequest: ProjectRequest = {
      id: Date.now().toString(),
      projectId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      message: "I would like to join this project and contribute my expertise.",
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
    }

    setRequests((prev) => [...prev, newRequest])

    toast({
      title: "Join request submitted!",
      description: "Your request to join the project has been sent to the project leader.",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "active":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "planning":
        return "secondary" as const
      case "active":
        return "default" as const
      case "completed":
        return "default" as const
      default:
        return "secondary" as const
    }
  }

  const allRegions = Array.from(new Set(projects.flatMap((project) => project.region)))

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collaboration Center</h1>
          <p className="text-gray-600">Join climate research projects and collaborate with experts across Africa</p>
        </div>

        {user && (user.role === "researcher" || user.role === "admin") && (
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Collaboration Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" rows={3} required />
                </div>
                <div>
                  <Label htmlFor="objectives">Objectives (one per line)</Label>
                  <Textarea id="objectives" name="objectives" rows={4} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" name="endDate" type="date" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="regions">Regions (comma-separated)</Label>
                  <Input id="regions" name="regions" placeholder="West Africa, East Africa" required />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" name="tags" placeholder="Climate Change, Agriculture, Research" required />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isPublic" name="isPublic" defaultChecked />
                  <Label htmlFor="isPublic">Make project publicly visible</Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                {allRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedStatus("all")
                setSelectedRegion("all")
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or create a new project.</p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <Badge variant={getStatusVariant(project.status)} className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="capitalize">{project.status}</span>
                      </Badge>
                      {!project.isPublic && <Badge variant="secondary">Private</Badge>}
                    </div>

                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">Objectives:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {project.objectives.slice(0, 3).map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              {objective}
                            </li>
                          ))}
                          {project.objectives.length > 3 && (
                            <li className="text-blue-600 cursor-pointer">
                              +{project.objectives.length - 3} more objectives
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Led by {project.leader}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{project.participants.length + 1} participants</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {project.startDate} - {project.endDate}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span>{project.discussionCount} discussions</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {project.region.map((region) => (
                        <Badge key={region} variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {region}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedProject(project)}>
                        View Details
                      </Button>

                      {user && project.leader !== user.name && !project.participants.includes(user.name) && (
                        <Button size="sm" onClick={() => handleJoinRequest(project.id)}>
                          <UserPlus className="mr-1 h-3 w-3" />
                          Request to Join
                        </Button>
                      )}

                      {user && (project.leader === user.name || project.participants.includes(user.name)) && (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Discussions
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">{selectedProject.description}</p>

              <div>
                <h4 className="font-medium mb-2">Project Objectives:</h4>
                <ul className="space-y-1">
                  {selectedProject.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Project Leader:</h4>
                  <p>{selectedProject.leader}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Participants:</h4>
                  <ul className="space-y-1">
                    {selectedProject.participants.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Timeline:</h4>
                  <p>
                    {selectedProject.startDate} - {selectedProject.endDate}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Progress:</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{selectedProject.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
