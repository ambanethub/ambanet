"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Users } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function ProjectCreate() {
  const [loading, setLoading] = useState(false)
  const [objectives, setObjectives] = useState<string[]>([""])
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const addObjective = () => {
    setObjectives([...objectives, ""])
  }

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives]
    newObjectives[index] = value
    setObjectives(newObjectives)
  }

  const removeObjective = (index: number) => {
    if (objectives.length > 1) {
      setObjectives(objectives.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate project creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Project created successfully!",
      description: "Your collaboration project has been created and is now visible to other researchers.",
    })

    router.push("/collab")
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/collab">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collaboration
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600">Start a new climate research collaboration project</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" placeholder="Enter a descriptive project title" required />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Provide a comprehensive description of your project goals, methodology, and expected outcomes..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Research Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="climate-change">Climate Change</SelectItem>
                    <SelectItem value="agriculture">Agriculture & Food Security</SelectItem>
                    <SelectItem value="water-resources">Water Resources</SelectItem>
                    <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                    <SelectItem value="drought">Drought & Desertification</SelectItem>
                    <SelectItem value="biodiversity">Biodiversity & Conservation</SelectItem>
                    <SelectItem value="policy">Climate Policy</SelectItem>
                    <SelectItem value="adaptation">Climate Adaptation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Project Duration</Label>
                <Select name="duration" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                    <SelectItem value="3-years">3+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" required />
              </div>

              <div>
                <Label htmlFor="endDate">Expected End Date</Label>
                <Input id="endDate" name="endDate" type="date" required />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="regions">Target Regions</Label>
                <Input
                  id="regions"
                  name="regions"
                  placeholder="West Africa, East Africa, Sahel, etc. (comma-separated)"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="tags">Research Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="climate modeling, satellite data, field research, etc. (comma-separated)"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label>Project Objectives</Label>
                <div className="space-y-3 mt-2">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                        placeholder={`Objective ${index + 1}`}
                        required
                      />
                      {objectives.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeObjective(index)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addObjective}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Objective
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="teamSize">Expected Team Size</Label>
                <Select name="teamSize" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-5">2-5 members</SelectItem>
                    <SelectItem value="6-10">6-10 members</SelectItem>
                    <SelectItem value="11-20">11-20 members</SelectItem>
                    <SelectItem value="20+">20+ members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skillsNeeded">Skills Needed</Label>
                <Input
                  id="skillsNeeded"
                  name="skillsNeeded"
                  placeholder="Data analysis, GIS, field research, etc."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="funding">Funding Information (Optional)</Label>
                <Textarea
                  id="funding"
                  name="funding"
                  rows={2}
                  placeholder="Information about project funding, grants, or budget requirements..."
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isPublic" name="isPublic" defaultChecked />
                  <Label htmlFor="isPublic">Make this project publicly visible</Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Public projects can be discovered and joined by other researchers
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="openToCollaboration" name="openToCollaboration" defaultChecked />
                  <Label htmlFor="openToCollaboration">Open to collaboration requests</Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">Allow other researchers to request to join your project</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/collab">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Users className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
