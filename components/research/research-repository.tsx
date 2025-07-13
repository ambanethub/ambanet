"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Upload, Download, Eye, FileText, Calendar, User, Building } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface ResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  institution: string
  tags: string[]
  region: string[]
  uploadDate: string
  downloads: number
  fileSize: string
  fileType: string
  isPublic: boolean
}

export function ResearchRepository() {
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching research papers
    const fetchPapers = async () => {
      setLoading(true)
      const mockPapers: ResearchPaper[] = [
        {
          id: "1",
          title: "Climate Change Impacts on Agricultural Productivity in Sub-Saharan Africa",
          abstract:
            "This study examines the effects of climate change on agricultural productivity across Sub-Saharan Africa, analyzing temperature and precipitation patterns over the past 30 years.",
          authors: ["Dr. Amina Hassan", "Prof. John Okafor", "Dr. Sarah Mwangi"],
          institution: "University of Nairobi",
          tags: ["Agriculture", "Climate Change", "Food Security", "Sub-Saharan Africa"],
          region: ["West Africa", "East Africa"],
          uploadDate: "2024-01-15",
          downloads: 234,
          fileSize: "2.4 MB",
          fileType: "PDF",
          isPublic: true,
        },
        {
          id: "2",
          title: "Drought Prediction Models for the Sahel Region Using Satellite Data",
          abstract:
            "Development of machine learning models for drought prediction in the Sahel region using satellite imagery and meteorological data.",
          authors: ["Dr. Sarah Johnson", "Dr. Mohamed Ali", "Prof. David Chen"],
          institution: "ICRISAT",
          tags: ["Drought", "Satellite Data", "Machine Learning", "Prediction Models"],
          region: ["West Africa", "Sahel"],
          uploadDate: "2024-01-12",
          downloads: 189,
          fileSize: "3.1 MB",
          fileType: "PDF",
          isPublic: true,
        },
        {
          id: "3",
          title: "Solar Radiation Patterns and Renewable Energy Potential in East Africa",
          abstract:
            "Analysis of solar radiation patterns across East Africa and assessment of renewable energy potential for sustainable development.",
          authors: ["Prof. David Kimani", "Dr. Grace Wanjiku"],
          institution: "Makerere University",
          tags: ["Solar Energy", "Renewable Energy", "East Africa", "Sustainability"],
          region: ["East Africa"],
          uploadDate: "2024-01-10",
          downloads: 156,
          fileSize: "1.8 MB",
          fileType: "PDF",
          isPublic: true,
        },
        {
          id: "4",
          title: "Water Resource Management in the Nile Basin: Climate Adaptation Strategies",
          abstract:
            "Comprehensive study on water resource management strategies in the Nile Basin considering climate change impacts.",
          authors: ["Dr. Ahmed Hassan", "Prof. Mary Ochieng"],
          institution: "Cairo University",
          tags: ["Water Resources", "Nile Basin", "Climate Adaptation", "Management"],
          region: ["East Africa", "North Africa"],
          uploadDate: "2024-01-08",
          downloads: 203,
          fileSize: "4.2 MB",
          fileType: "PDF",
          isPublic: false,
        },
      ]

      setTimeout(() => {
        setPapers(mockPapers)
        setFilteredPapers(mockPapers.filter((paper) => paper.isPublic || user))
        setLoading(false)
      }, 1000)
    }

    fetchPapers()
  }, [user])

  useEffect(() => {
    let filtered = papers.filter((paper) => paper.isPublic || user)

    if (searchTerm) {
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          paper.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedTag) {
      filtered = filtered.filter((paper) => paper.tags.includes(selectedTag))
    }

    if (selectedRegion) {
      filtered = filtered.filter((paper) => paper.region.includes(selectedRegion))
    }

    setFilteredPapers(filtered)
  }, [searchTerm, selectedTag, selectedRegion, papers, user])

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload research papers.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData(e.currentTarget)
    const newPaper: ResearchPaper = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      abstract: formData.get("abstract") as string,
      authors: [user.name],
      institution: user.institution || "Unknown Institution",
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
      region: (formData.get("regions") as string).split(",").map((region) => region.trim()),
      uploadDate: new Date().toISOString().split("T")[0],
      downloads: 0,
      fileSize: "2.1 MB",
      fileType: "PDF",
      isPublic: formData.get("isPublic") === "on",
    }

    setPapers((prev) => [newPaper, ...prev])
    setUploadDialogOpen(false)

    toast({
      title: "Research uploaded successfully!",
      description: "Your research paper has been added to the repository.",
    })
  }

  const handleDownload = (paperId: string) => {
    const paper = papers.find((p) => p.id === paperId)
    if (paper) {
      setPapers((prev) => prev.map((p) => (p.id === paperId ? { ...p, downloads: p.downloads + 1 } : p)))

      toast({
        title: "Download started",
        description: `Downloading "${paper.title}"`,
      })
    }
  }

  const allTags = Array.from(new Set(papers.flatMap((paper) => paper.tags)))
  const allRegions = Array.from(new Set(papers.flatMap((paper) => paper.region)))

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
          <h1 className="text-3xl font-bold text-gray-900">Research Repository</h1>
          <p className="text-gray-600">Explore climate research papers and studies from across Africa</p>
        </div>

        {user && (user.role === "researcher" || user.role === "admin") && (
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Research
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Research Paper</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="abstract">Abstract</Label>
                  <Textarea id="abstract" name="abstract" rows={4} required />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" name="tags" placeholder="Climate Change, Agriculture, Drought" required />
                </div>
                <div>
                  <Label htmlFor="regions">Regions (comma-separated)</Label>
                  <Input id="regions" name="regions" placeholder="West Africa, East Africa" required />
                </div>
                <div>
                  <Label htmlFor="file">Research File</Label>
                  <Input id="file" name="file" type="file" accept=".pdf,.doc,.docx" required />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isPublic" name="isPublic" defaultChecked />
                  <Label htmlFor="isPublic">Make publicly available</Label>
                </div>
                <Button type="submit" className="w-full">
                  Upload Research
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
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allTags">All tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allRegions">All regions</SelectItem>
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
                setSelectedTag("")
                setSelectedRegion("")
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Research Papers */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No research papers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPapers.map((paper) => (
            <Card key={paper.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {paper.authors.join(", ")}
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {paper.institution}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {paper.uploadDate}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{paper.abstract}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {paper.region.map((region) => (
                        <Badge key={region} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {paper.downloads} downloads • {paper.fileSize} • {paper.fileType}
                        {!paper.isPublic && (
                          <Badge variant="secondary" className="ml-2">
                            Private
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        <Button size="sm" onClick={() => handleDownload(paper.id)} disabled={!paper.isPublic && !user}>
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <FileText className="h-12 w-12 text-blue-500 ml-6" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
