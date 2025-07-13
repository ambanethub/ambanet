"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "info" | "success"
  title: string
  description: string
  region: string
  timestamp: string
}

export function AlertsPanel() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "warning",
      title: "Drought Warning",
      description: "Severe drought conditions detected in the Sahel region",
      region: "West Africa",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info",
      title: "Temperature Anomaly",
      description: "Above average temperatures recorded in East Africa",
      region: "East Africa",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "success",
      title: "Rainfall Improvement",
      description: "Increased rainfall patterns in Central Africa",
      region: "Central Africa",
      timestamp: "6 hours ago",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive" as const
      case "info":
        return "default" as const
      case "success":
        return "default" as const
      default:
        return "default" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Climate Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            {getAlertIcon(alert.type)}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{alert.title}</h4>
                <Badge variant={getAlertVariant(alert.type)}>{alert.region}</Badge>
              </div>
              <p className="text-sm text-gray-600">{alert.description}</p>
              <p className="text-xs text-gray-500">{alert.timestamp}</p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full bg-transparent">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
