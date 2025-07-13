"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, Download, Share, Calendar } from "lucide-react"

interface MapData {
  region: string
  coordinates: [number, number]
  temperature: number
  rainfall: number
  droughtIndex: number
  solarRadiation: number
}

export function ClimateMap() {
  const [selectedLayer, setSelectedLayer] = useState("temperature")
  const [timeRange, setTimeRange] = useState([0])
  const [mapData, setMapData] = useState<MapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching map data
    const fetchMapData = async () => {
      setLoading(true)
      const mockData: MapData[] = [
        {
          region: "Lagos, Nigeria",
          coordinates: [6.5244, 3.3792],
          temperature: 28.5,
          rainfall: 45.2,
          droughtIndex: 0.3,
          solarRadiation: 22.8,
        },
        {
          region: "Nairobi, Kenya",
          coordinates: [-1.2921, 36.8219],
          temperature: 22.1,
          rainfall: 78.5,
          droughtIndex: 0.1,
          solarRadiation: 25.4,
        },
        {
          region: "Cairo, Egypt",
          coordinates: [30.0444, 31.2357],
          temperature: 32.8,
          rainfall: 2.1,
          droughtIndex: 0.8,
          solarRadiation: 28.9,
        },
        {
          region: "Cape Town, South Africa",
          coordinates: [-33.9249, 18.4241],
          temperature: 18.7,
          rainfall: 65.3,
          droughtIndex: 0.2,
          solarRadiation: 20.1,
        },
        {
          region: "Accra, Ghana",
          coordinates: [5.6037, -0.187],
          temperature: 27.3,
          rainfall: 52.8,
          droughtIndex: 0.4,
          solarRadiation: 23.6,
        },
      ]

      setTimeout(() => {
        setMapData(mockData)
        setLoading(false)
      }, 1000)
    }

    fetchMapData()
  }, [selectedLayer])

  const getColorForValue = (value: number, type: string) => {
    switch (type) {
      case "temperature":
        if (value < 20) return "bg-blue-500"
        if (value < 30) return "bg-green-500"
        return "bg-red-500"
      case "rainfall":
        if (value < 20) return "bg-red-500"
        if (value < 60) return "bg-yellow-500"
        return "bg-blue-500"
      case "drought":
        if (value < 0.3) return "bg-green-500"
        if (value < 0.6) return "bg-yellow-500"
        return "bg-red-500"
      case "solar":
        if (value < 20) return "bg-blue-500"
        if (value < 25) return "bg-yellow-500"
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getValue = (data: MapData, type: string) => {
    switch (type) {
      case "temperature":
        return data.temperature
      case "rainfall":
        return data.rainfall
      case "drought":
        return data.droughtIndex
      case "solar":
        return data.solarRadiation
      default:
        return 0
    }
  }

  const getUnit = (type: string) => {
    switch (type) {
      case "temperature":
        return "°C"
      case "rainfall":
        return "mm"
      case "drought":
        return "index"
      case "solar":
        return "MJ/m²"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-96 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Climate Map</h1>
          <p className="text-gray-600">Interactive climate data visualization across Africa</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Map Controls
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Data Layer</label>
              <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="rainfall">Rainfall</SelectItem>
                  <SelectItem value="drought">Drought Index</SelectItem>
                  <SelectItem value="solar">Solar Radiation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last 30 days</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Opacity</label>
              <Slider value={timeRange} onValueChange={setTimeRange} max={100} step={1} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Visualization */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
            {/* Simulated Africa Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 text-lg">Interactive Map View</div>
            </div>

            {/* Data Points */}
            {mapData.map((point, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full ${getColorForValue(
                    getValue(point, selectedLayer),
                    selectedLayer,
                  )} opacity-80 hover:opacity-100 transition-opacity`}
                />

                {/* Tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-medium">{point.region}</div>
                  <div>
                    {selectedLayer}: {getValue(point, selectedLayer).toFixed(1)} {getUnit(selectedLayer)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend and Data Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedLayer === "temperature" && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Cold (&lt; 20°C)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Moderate (20-30°C)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Hot (&gt; 30°C)</span>
                  </div>
                </>
              )}
              {selectedLayer === "rainfall" && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Low (&lt; 20mm)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Moderate (20-60mm)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">High (&gt; 60mm)</span>
                  </div>
                </>
              )}
              {selectedLayer === "drought" && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Normal (&lt; 0.3)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Moderate (0.3-0.6)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Severe (&gt; 0.6)</span>
                  </div>
                </>
              )}
              {selectedLayer === "solar" && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Low (&lt; 20 MJ/m²)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Moderate (20-25 MJ/m²)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">High (&gt; 25 MJ/m²)</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mapData.map((point, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm">{point.region}</div>
                    <div className="text-xs text-gray-600">
                      {getValue(point, selectedLayer).toFixed(1)} {getUnit(selectedLayer)}
                    </div>
                  </div>
                  <Badge
                    variant={
                      getValue(point, selectedLayer) >
                      (selectedLayer === "drought" ? 0.6 : selectedLayer === "temperature" ? 30 : 60)
                        ? "destructive"
                        : "default"
                    }
                  >
                    {getValue(point, selectedLayer) >
                    (selectedLayer === "drought" ? 0.6 : selectedLayer === "temperature" ? 30 : 60)
                      ? "High"
                      : "Normal"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
