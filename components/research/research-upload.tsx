"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function ResearchUpload() {
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Simulate file upload and processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Research uploaded successfully!",
      description: "Your research paper has been submitted for review.",
    })

    router.push("/research")
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/research">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Research</h1>
          <p className="text-gray-600">Share your climate research with the African research community</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Research Paper Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Research Title</Label>
                <Input id="title" name="title" placeholder="Enter the title of your research paper" required />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  name="abstract"
                  rows={6}
                  placeholder="Provide a comprehensive abstract of your research..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="authors">Authors</Label>
                <Input
                  id="authors"
                  name="authors"
                  placeholder="John Doe, Jane Smith, etc."
                  defaultValue={user?.name}
                  required
                />
              </div>

              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  placeholder="University or Research Institution"
                  defaultValue={user?.institution}
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
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="water-resources">Water Resources</SelectItem>
                    <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                    <SelectItem value="drought">Drought Studies</SelectItem>
                    <SelectItem value="biodiversity">Biodiversity</SelectItem>
                    <SelectItem value="policy">Climate Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="regions">Regions Covered</Label>
                <Input id="regions" name="regions" placeholder="West Africa, East Africa, etc." required />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="climate change, agriculture, drought, sustainability (comma-separated)"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="file">Research File</Label>
                <div className="mt-2">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX (Max size: 10MB)</p>
                  {selectedFile && (
                    <div className="mt-2 p-2 bg-gray-50 rounded flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">{selectedFile.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isPublic" name="isPublic" defaultChecked />
                  <Label htmlFor="isPublic">Make this research publicly available</Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">Public research can be viewed and downloaded by all users</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="agreeTerms" name="agreeTerms" required />
                  <Label htmlFor="agreeTerms">
                    I agree to the terms of service and confirm that this research is original
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/research">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Research
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
