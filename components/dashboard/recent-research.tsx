"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  institution: string
  tags: string[]
  uploadDate: string
  downloads: number
}

export function RecentResearch() {
  const recentPapers: ResearchPaper[] = [
    {
      id: "1",
      title: "Climate Change Impacts on Agricultural Productivity in Sub-Saharan Africa",
      authors: ["Dr. Amina Hassan", "Prof. John Okafor"],
      institution: "University of Nairobi",
      tags: ["Agriculture", "Climate Change", "Food Security"],
      uploadDate: "2024-01-15",
      downloads: 234,
    },
    {
      id: "2",
      title: "Drought Prediction Models for the Sahel Region Using Satellite Data",
      authors: ["Dr. Sarah Johnson", "Dr. Mohamed Ali"],
      institution: "ICRISAT",
      tags: ["Drought", "Satellite Data", "Prediction Models"],
      uploadDate: "2024-01-12",
      downloads: 189,
    },
    {
      id: "3",
      title: "Solar Radiation Patterns and Renewable Energy Potential in East Africa",
      authors: ["Prof. David Kimani"],
      institution: "Makerere University",
      tags: ["Solar Energy", "Renewable Energy", "East Africa"],
      uploadDate: "2024-01-10",
      downloads: 156,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Research Uploads
          <Button variant="outline" size="sm">
            View Repository
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPapers.map((paper) => (
          <div key={paper.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-lg mb-1">{paper.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {paper.authors.join(", ")} • {paper.institution}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {paper.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Uploaded {paper.uploadDate} • {paper.downloads} downloads
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500 ml-4" />
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="mr-1 h-3 w-3" />
                View
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-1 h-3 w-3" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
