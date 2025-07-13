// NASA POWER API Integration
const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"

export interface NASAClimateData {
  temperature: number
  precipitation: number
  solarRadiation: number
  humidity: number
  windSpeed: number
  date: string
  latitude: number
  longitude: number
}

export interface NASAAPIParams {
  latitude: number
  longitude: number
  startDate: string
  endDate: string
  parameters: string[]
}

export class NASAClimateAPI {
  static formatDate(date: Date): string {
    return date.toISOString().split("T")[0].replace(/-/g, "")
  }

  static async fetchClimateData(params: NASAAPIParams): Promise<NASAClimateData[]> {
    const { latitude, longitude, startDate, endDate, parameters } = params

    const url = new URL(NASA_POWER_BASE_URL)
    url.searchParams.append("parameters", parameters.join(","))
    url.searchParams.append("community", "AG")
    url.searchParams.append("longitude", longitude.toString())
    url.searchParams.append("latitude", latitude.toString())
    url.searchParams.append("start", startDate)
    url.searchParams.append("end", endDate)
    url.searchParams.append("format", "JSON")

    try {
      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`)
      }

      const data = await response.json()

      // Transform NASA data to our format
      return this.transformNASAData(data, latitude, longitude)
    } catch (error) {
      console.error("Error fetching NASA climate data:", error)
      // Return mock data as fallback
      return this.getMockData(latitude, longitude)
    }
  }

  private static transformNASAData(nasaData: any, lat: number, lon: number): NASAClimateData[] {
    const properties = nasaData.properties?.parameter
    if (!properties) return []

    const dates = Object.keys(properties.T2M || {})

    return dates.map((date) => ({
      temperature: properties.T2M?.[date] || 0,
      precipitation: properties.PRECTOTCORR?.[date] || 0,
      solarRadiation: properties.ALLSKY_SFC_SW_DWN?.[date] || 0,
      humidity: properties.RH2M?.[date] || 0,
      windSpeed: properties.WS2M?.[date] || 0,
      date: this.formatDateFromNASA(date),
      latitude: lat,
      longitude: lon,
    }))
  }

  private static formatDateFromNASA(nasaDate: string): string {
    // NASA format: YYYYMMDD -> YYYY-MM-DD
    return `${nasaDate.slice(0, 4)}-${nasaDate.slice(4, 6)}-${nasaDate.slice(6, 8)}`
  }

  private static getMockData(lat: number, lon: number): NASAClimateData[] {
    // Fallback mock data when API is unavailable
    const data: NASAClimateData[] = []
    const today = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      data.push({
        temperature: 20 + Math.random() * 15,
        precipitation: Math.random() * 10,
        solarRadiation: 15 + Math.random() * 10,
        humidity: 40 + Math.random() * 40,
        windSpeed: 2 + Math.random() * 8,
        date: date.toISOString().split("T")[0],
        latitude: lat,
        longitude: lon,
      })
    }

    return data
  }

  // Get current weather for multiple African cities
  static async getAfricanCitiesData(): Promise<NASAClimateData[]> {
    const africanCities = [
      { name: "Lagos", lat: 6.5244, lon: 3.3792 },
      { name: "Nairobi", lat: -1.2921, lon: 36.8219 },
      { name: "Cairo", lat: 30.0444, lon: 31.2357 },
      { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
      { name: "Accra", lat: 5.6037, lon: -0.187 },
      { name: "Addis Ababa", lat: 9.032, lon: 38.7469 },
      { name: "Casablanca", lat: 33.5731, lon: -7.5898 },
      { name: "Tunis", lat: 36.8065, lon: 10.1815 },
    ]

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7) // Last 7 days

    const parameters = ["T2M", "PRECTOTCORR", "ALLSKY_SFC_SW_DWN", "RH2M", "WS2M"]

    const promises = africanCities.map((city) =>
      this.fetchClimateData({
        latitude: city.lat,
        longitude: city.lon,
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate),
        parameters,
      }),
    )

    try {
      const results = await Promise.all(promises)
      return results.flat()
    } catch (error) {
      console.error("Error fetching African cities data:", error)
      return []
    }
  }

  // Get drought index calculation
  static calculateDroughtIndex(precipitation: number, temperature: number): number {
    // Simplified drought index calculation
    // In reality, this would use more complex algorithms like SPI or PDSI
    const normalPrecip = 50 // mm per month average
    const normalTemp = 25 // °C average

    const precipRatio = Math.max(0, normalPrecip - precipitation) / normalPrecip
    const tempRatio = Math.max(0, temperature - normalTemp) / normalTemp

    return Math.min(1, (precipRatio + tempRatio) / 2)
  }
}
