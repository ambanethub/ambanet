"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ClimateData {
  temperature: number
  rainfall: number
  solarRadiation: number
  droughtIndex: number
  region: string
  timestamp: string
}

interface ClimateChartProps {
  data: ClimateData[]
}

export function ClimateChart({ data }: ClimateChartProps) {
  // Generate historical data for the chart
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    temperature: 25 + Math.random() * 10,
    rainfall: Math.random() * 100,
    solarRadiation: 15 + Math.random() * 15,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>30-Day Climate Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" />
            <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={2} name="Rainfall (mm)" />
            <Line
              type="monotone"
              dataKey="solarRadiation"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Solar Radiation (MJ/m²)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
