"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Info, CheckCircle, Search, Filter, Bell, Settings, MapPin, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ClimateAlert {
  id: string
  type: "warning" | "info" | "success" | "critical"
  title: string
  description: string
  region: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  isActive: boolean
  source: string
  coordinates?: [number, number]
}

interface AlertSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  severityThreshold: "low" | "medium" | "high" | "critical"
  regions: string[]
}

export function AlertsCenter() {
  const [alerts, setAlerts] = useState<ClimateAlert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<ClimateAlert[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<AlertSettings>({
    emailNotifications: true,
    pushNotifications: true,
    severityThreshold: "medium",
    regions: ["West Africa", "East Africa"],
  })

  const { toast } = useToast()

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/alerts")
        const data = await response.json()
        setAlerts(data)
        setFilteredAlerts(data)
      } catch (error) {
        toast({
          title: "Error fetching alerts",
          description: "Could not load climate alerts.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()

    // Set up real-time updates
    const interval = setInterval(fetchAlerts, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = alerts

    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.region.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter((alert) => alert.severity === selectedSeverity)
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((alert) => alert.region === selectedRegion)
    }

    setFilteredAlerts(filtered)
  }, [searchTerm, selectedSeverity, selectedRegion, alerts])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive" as const
      case "high":
        return "destructive" as const
      case "medium":
        return "default" as const
      case "low":
        return "secondary" as const
      default:
        return "default" as const
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isActive: false } : alert)))
    toast({
      title: "Alert dismissed",
      description: "The alert has been marked as resolved.",
    })
  }

  const handleSettingsUpdate = (key: keyof AlertSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Settings updated",
      description: "Your alert preferences have been saved.",
    })
  }

  const allRegions = Array.from(new Set(alerts.map((alert) => alert.region)))
  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const criticalAlerts = activeAlerts.filter((alert) => alert.severity === "critical")

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
          <h1 className="text-3xl font-bold text-gray-900">Climate Alerts Center</h1>
          <p className="text-gray-600">Real-time climate alerts and warnings across Africa</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="flex items-center">
            <AlertTriangle className="mr-1 h-3 w-3" />
            {criticalAlerts.length} Critical
          </Badge>
          <Badge variant="default" className="flex items-center">
            <Bell className="mr-1 h-3 w-3" />
            {activeAlerts.length} Active
          </Badge>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{activeAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Regions Monitored</p>
                <p className="text-2xl font-bold text-gray-900">{allRegions.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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
                setSelectedSeverity("all")
                setSelectedRegion("all")
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(value) => handleSettingsUpdate("emailNotifications", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(value) => handleSettingsUpdate("pushNotifications", value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Severity Threshold</Label>
                <p className="text-sm text-gray-600 mb-2">Minimum severity level for notifications</p>
                <Select
                  value={settings.severityThreshold}
                  onValueChange={(value) => handleSettingsUpdate("severityThreshold", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low and above</SelectItem>
                    <SelectItem value="medium">Medium and above</SelectItem>
                    <SelectItem value="high">High and above</SelectItem>
                    <SelectItem value="critical">Critical only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`${!alert.isActive ? "opacity-60" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{alert.title}</h4>
                        <Badge variant={getSeverityVariant(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                        {!alert.isActive && <Badge variant="secondary">Resolved</Badge>}
                      </div>

                      <p className="text-gray-700 mb-3">{alert.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.region}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatTimestamp(alert.timestamp)}
                        </div>
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          {alert.source}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {alert.isActive && (
                      <Button size="sm" variant="outline" onClick={() => handleDismissAlert(alert.id)}>
                        Dismiss
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
