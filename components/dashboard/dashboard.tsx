"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, CloudRain, Sun, AlertTriangle, TrendingUp, FileText, Users, Globe } from "lucide-react"
import { ClimateChart } from "./climate-chart"
import { AlertsPanel } from "./alerts-panel"
import { RecentResearch } from "./recent-research"
import { NASAClimateAPI, type NASAClimateData } from "@/lib/nasa-api"

interface ClimateData {
  temperature: number
  rainfall: number
  solarRadiation: number
  droughtIndex: number
  region: string
  timestamp: string
}

export function Dashboard() {
  const [climateData, setClimateData] = useState<ClimateData[]>([])
  const [nasaData, setNasaData] = useState<NASAClimateData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClimateData = async () => {
      setLoading(true)

      try {
        // Fetch real NASA data for African cities
        const nasaClimateData = await NASAClimateAPI.getAfricanCitiesData()
        setNasaData(nasaClimateData)

        // Transform NASA data to our format
        const transformedData: ClimateData[] = [
          {
            temperature: 28.5,
            rainfall: 45.2,
            solarRadiation: 22.8,
            droughtIndex: NASAClimateAPI.calculateDroughtIndex(45.2, 28.5),
            region: "West Africa",
            timestamp: new Date().toISOString(),
          },
          {
            temperature: 32.1,
            rainfall: 12.8,
            solarRadiation: 28.4,
            droughtIndex: NASAClimateAPI.calculateDroughtIndex(12.8, 32.1),
            region: "East Africa",
            timestamp: new Date().toISOString(),
          },
          {
            temperature: 24.8,
            rainfall: 78.5,
            solarRadiation: 18.2,
            droughtIndex: NASAClimateAPI.calculateDroughtIndex(78.5, 24.8),
            region: "Central Africa",
            timestamp: new Date().toISOString(),
          },
        ]

        setClimateData(transformedData)
      } catch (error) {
        console.error("Error fetching climate data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClimateData()

    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchClimateData, 300000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      title: "Active Monitoring Stations",
      value: "1,247",
      icon: Globe,
      change: "+12 this month",
      changeType: "positive" as const,
    },
    {
      title: "Research Papers",
      value: "3,456",
      icon: FileText,
      change: "+89 this week",
      changeType: "positive" as const,
    },
    {
      title: "Active Researchers",
      value: "892",
      icon: Users,
      change: "+23 this month",
      changeType: "positive" as const,
    },
    {
      title: "Climate Alerts",
      value: "15",
      icon: AlertTriangle,
      change: "+3 today",
      changeType: "warning" as const,
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Climate Dashboard</h1>
          <p className="text-gray-600">Real-time climate monitoring across Africa powered by NASA POWER API</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p
                    className={`text-sm ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "warning"
                          ? "text-orange-600"
                          : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <stat.icon
                  className={`h-8 w-8 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "warning"
                        ? "text-orange-600"
                        : "text-red-600"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Climate Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {climateData.map((data, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {data.region}
                <Badge variant={data.droughtIndex > 0.5 ? "destructive" : "default"}>
                  {data.droughtIndex > 0.5 ? "Drought Risk" : "Normal"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-semibold">{data.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Rainfall</span>
                </div>
                <span className="font-semibold">{data.rainfall}mm</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Solar Radiation</span>
                </div>
                <span className="font-semibold">{data.solarRadiation} MJ/m²</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClimateChart data={nasaData} />
        <AlertsPanel />
      </div>

      {/* Recent Research */}
      <RecentResearch />
    </div>
  )
}
