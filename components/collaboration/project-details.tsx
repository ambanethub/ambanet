"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Users, Calendar, MapPin, Target, MessageSquare, UserPlus, Settings } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface ProjectDetailsProps {
  id: string
}

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
  category: string
  isPublic: boolean
}

export function ProjectDetails({ id }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/collab/projects/${id}`)
        if (!response.ok) {
          throw new Error("Project not found")
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        setProject(null)
        toast({
          title: "Error fetching project details",
          description: "Could not load the project details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleJoinRequest = () => {
    toast({
      title: "Join request submitted!",
      description: "Your request to join the project has been sent to the project leader.",
    })
  }

  const isParticipant = user && project && (project.leader === user.name || project.participants.includes(user.name))
  const isLeader = user && project && project.leader === user.name

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Project not found</h3>
          <p className="text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/collab">
            <Button className="mt-4">Back to Collaboration</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/collab">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-4">{project.title}</CardTitle>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="default">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</Badge>
                <Badge variant="secondary">{project.category}</Badge>
                {!project.isPublic && <Badge variant="outline">Private</Badge>}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Led by {project.leader}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {project.startDate} - {project.endDate}
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {project.progress}% Complete
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 ml-6">
              {user && !isParticipant && (
                <Button onClick={handleJoinRequest}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Request to Join
                </Button>
              )}

              {isParticipant && (
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discussions
                </Button>
              )}

              {isLeader && (
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Project
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Project Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              {isParticipant && <TabsTrigger value="discussions">Discussions</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                <div className="prose max-w-none text-gray-700">
                  {project.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Research Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Target Regions</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.region.map((region) => (
                      <Badge key={region} variant="outline">
                        <MapPin className="h-3 w-3 mr-1" />
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4">
              <h3 className="text-lg font-semibold">Project Objectives</h3>
              <div className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <h3 className="text-lg font-semibold">Project Team</h3>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                      {project.leader
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium">{project.leader}</h4>
                      <p className="text-sm text-gray-600">Project Leader</p>
                    </div>
                  </div>
                </div>

                {project.participants.map((participant, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center font-medium">
                        {participant
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-medium">{participant}</h4>
                        <p className="text-sm text-gray-600">Team Member</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <h3 className="text-lg font-semibold">Project Timeline</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Start Date</h4>
                      <p className="text-gray-600">{project.startDate}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Expected End Date</h4>
                      <p className="text-gray-600">{project.endDate}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Current Status</h4>
                    <p className="text-gray-600 mb-2">
                      The project is currently in the {project.status} phase with {project.progress}% completion.
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {isParticipant && (
              <TabsContent value="discussions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Project Discussions</h3>
                  <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Discussion
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h4>
                    <p className="text-gray-600">Start a discussion to collaborate with your team members.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
