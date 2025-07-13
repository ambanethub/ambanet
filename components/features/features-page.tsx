"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Satellite,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Database,
  Bell,
  Map,
  FileText,
  MessageSquare,
  BarChart3,
  Cloud,
  Smartphone,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export function FeaturesPage() {
  const features = [
    {
      category: "Data & Monitoring",
      icon: Satellite,
      color: "green",
      items: [
        {
          name: "Real-Time Climate Data",
          description: "Live data from NASA POWER API, satellite imagery, and ground stations",
          icon: Satellite,
        },
        {
          name: "Interactive Climate Maps",
          description: "Visualize temperature, precipitation, drought conditions, and more",
          icon: Map,
        },
        {
          name: "Historical Data Analysis",
          description: "Access decades of climate data for trend analysis and research",
          icon: Database,
        },
        {
          name: "Multi-Parameter Monitoring",
          description: "Track temperature, rainfall, solar radiation, humidity, and wind speed",
          icon: BarChart3,
        },
      ],
    },
    {
      category: "Research & Collaboration",
      icon: Users,
      color: "blue",
      items: [
        {
          name: "Research Repository",
          description: "Share and discover climate research papers from across Africa",
          icon: FileText,
        },
        {
          name: "Project Collaboration",
          description: "Connect with researchers and collaborate on climate projects",
          icon: Users,
        },
        {
          name: "Discussion Forums",
          description: "Engage in scientific discussions and knowledge sharing",
          icon: MessageSquare,
        },
        {
          name: "Peer Review System",
          description: "Quality-controlled research publication and review process",
          icon: CheckCircle,
        },
      ],
    },
    {
      category: "Analytics & Insights",
      icon: TrendingUp,
      color: "purple",
      items: [
        {
          name: "Predictive Analytics",
          description: "AI-powered forecasting for drought, temperature, and precipitation",
          icon: TrendingUp,
        },
        {
          name: "Drought Index Calculation",
          description: "Real-time drought severity assessment and monitoring",
          icon: Cloud,
        },
        {
          name: "Climate Trend Analysis",
          description: "Long-term climate pattern analysis and visualization",
          icon: BarChart3,
        },
        {
          name: "Custom Reports",
          description: "Generate detailed climate reports for specific regions and timeframes",
          icon: FileText,
        },
      ],
    },
    {
      category: "Alerts & Notifications",
      icon: Shield,
      color: "red",
      items: [
        {
          name: "Early Warning System",
          description: "Automated alerts for extreme weather events and climate anomalies",
          icon: Shield,
        },
        {
          name: "Custom Alert Rules",
          description: "Set personalized thresholds for temperature, rainfall, and other parameters",
          icon: Bell,
        },
        {
          name: "Multi-Channel Notifications",
          description: "Receive alerts via email, SMS, and push notifications",
          icon: Smartphone,
        },
        {
          name: "Regional Alert Coverage",
          description: "Comprehensive monitoring across all African countries and regions",
          icon: Globe,
        },
      ],
    },
  ]

  const integrations = [
    { name: "NASA POWER API", description: "Satellite-based climate data", status: "Active" },
    { name: "ECMWF", description: "European weather forecasting", status: "Coming Soon" },
    { name: "NOAA", description: "US climate and weather data", status: "Coming Soon" },
    { name: "Regional Weather Services", description: "Local meteorological data", status: "Active" },
    { name: "Agricultural Monitoring", description: "Crop and livestock data", status: "Beta" },
    { name: "Hydrological Services", description: "Water resource monitoring", status: "Beta" },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Amba Net
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Platform Features
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for Climate Intelligence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive tools and features designed specifically for African climate monitoring, research, and
            collaboration. Powered by cutting-edge technology and real-time data from trusted sources.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Explore Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features by Category */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="data" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="data">Data & Monitoring</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="data" className="space-y-8">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Satellite className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-Time Climate Data</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Access comprehensive climate data from multiple sources including NASA satellites, ground stations,
                  and regional monitoring networks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features[0].items.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research" className="space-y-8">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Research & Collaboration</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Connect with researchers across Africa, share findings, and collaborate on groundbreaking climate
                  research projects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features[1].items.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Leverage AI and machine learning to gain insights from climate data, predict trends, and make informed
                  decisions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features[2].items.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-8">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Early Warning System</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Stay ahead of climate events with automated alerts, custom thresholds, and multi-channel notifications
                  for timely response.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features[3].items.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">
              Built with modern technology stack for reliability, scalability, and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Data Infrastructure</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time data processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    99.9% uptime guarantee
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Scalable cloud architecture
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automated backups
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Security & Privacy</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    GDPR compliant
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Role-based access control
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Regular security audits
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">API & Integration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    RESTful API access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    WebSocket real-time updates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Third-party integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Comprehensive documentation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Sources & Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Data Sources & Integrations</h2>
            <p className="text-xl text-gray-600">
              Connected to leading climate data providers and research institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{integration.name}</h3>
                    <Badge
                      variant={
                        integration.status === "Active"
                          ? "default"
                          : integration.status === "Beta"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers and organizations using Amba Net to make data-driven climate decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
