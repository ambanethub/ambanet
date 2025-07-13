"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Share, Bookmark, User, Building, Calendar, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ResearchDetailsProps {
  id: string
}

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
  category: string
  keywords: string[]
}

export function ResearchDetails({ id }: ResearchDetailsProps) {
  const [paper, setPaper] = useState<ResearchPaper | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPaper = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/research/${id}`)
        if (!response.ok) {
          throw new Error("Paper not found")
        }
        const data = await response.json()
        setPaper(data)
      } catch (error) {
        setPaper(null)
        toast({
          title: "Error fetching research paper",
          description: "Could not load the research paper.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPaper()
  }, [id])

  const handleDownload = () => {
    if (paper) {
      setPaper((prev) => (prev ? { ...prev, downloads: prev.downloads + 1 } : null))
      toast({
        title: "Download started",
        description: `Downloading "${paper.title}"`,
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Research removed from bookmarks" : "Research added to bookmarks",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Research link copied to clipboard",
    })
  }

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

  if (!paper) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Research not found</h3>
          <p className="text-gray-600">The research paper you're looking for doesn't exist or has been removed.</p>
          <Link href="/research">
            <Button className="mt-4">Back to Research</Button>
          </Link>
        </CardContent>
      </Card>
    )
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
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-4">{paper.title}</CardTitle>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default">{paper.category}</Badge>
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
            </div>

            <div className="flex flex-col space-y-2 ml-6">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={handleBookmark}>
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Abstract</h3>
            <div className="prose max-w-none text-gray-700">
              {paper.abstract.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Research Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">File Type:</span>
                  <span>{paper.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span>{paper.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Downloads:</span>
                  <span>{paper.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Access:</span>
                  <span>{paper.isPublic ? "Public" : "Private"}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-1">
                {paper.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Citation</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm">
                {paper.authors.join(", ")} ({new Date(paper.uploadDate).getFullYear()}). {paper.title}.
                {paper.institution}. Retrieved from Amba Net Climate Platform.
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
