import { type NextRequest, NextResponse } from "next/server"
import { NASAClimateAPI } from "@/lib/nasa-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
    }

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 1) // Yesterday's data

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30) // Last 30 days

    const climateData = await NASAClimateAPI.fetchClimateData({
      latitude: Number.parseFloat(lat),
      longitude: Number.parseFloat(lon),
      startDate: NASAClimateAPI.formatDate(startDate),
      endDate: NASAClimateAPI.formatDate(endDate),
      parameters: ["T2M", "PRECTOTCORR", "ALLSKY_SFC_SW_DWN", "RH2M", "WS2M"],
    })

    return NextResponse.json(climateData)
  } catch (error) {
    console.error("Climate API error:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: "Failed to fetch climate data", details: errorMessage }, { status: 500 })
  }
}
