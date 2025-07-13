"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Heart, ArrowRight, Linkedin, Twitter, Mail } from "lucide-react"

export function AboutPage() {
  const team = [
    {
      name: "Dr. Amina Hassan",
      role: "Chief Climate Scientist",
      bio: "Leading climate researcher with 15+ years experience in African climate systems",
      image: "AH",
      social: { linkedin: "#", twitter: "#", email: "amina@ambanet.org" },
    },
    {
      name: "Prof. John Okafor",
      role: "Director of Research",
      bio: "Expert in agricultural climate adaptation and sustainable development",
      image: "JO",
      social: { linkedin: "#", twitter: "#", email: "john@ambanet.org" },
    },
    {
      name: "Dr. Sarah Mwangi",
      role: "Head of Technology",
      bio: "Software architect specializing in climate data systems and APIs",
      image: "SM",
      social: { linkedin: "#", twitter: "#", email: "sarah@ambanet.org" },
    },
    {
      name: "Dr. Mohamed Ali",
      role: "Policy Advisor",
      bio: "Climate policy expert working with governments across the Sahel region",
      image: "MA",
      social: { linkedin: "#", twitter: "#", email: "mohamed@ambanet.org" },
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "Amba Net founded with support from leading African universities",
    },
    { year: "2021", title: "First Launch", description: "Beta platform launched with 5 countries and 100 researchers" },
    { year: "2022", title: "NASA Partnership", description: "Integrated NASA POWER API for real-time satellite data" },
    { year: "2023", title: "Continental Expansion", description: "Expanded to cover all 54 African countries" },
    { year: "2024", title: "AI Integration", description: "Launched predictive analytics and early warning systems" },
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
            About Amba Net
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Empowering Africa's Climate Future</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the most comprehensive climate monitoring and research platform for Africa, connecting
            scientists, policymakers, and communities to create sustainable solutions for climate challenges.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize access to climate data and research tools across Africa, enabling evidence-based
                  decision making for sustainable development and climate resilience.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  A climate-resilient Africa where communities, researchers, and governments have the tools and
                  knowledge needed to adapt to and mitigate climate change effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-gray-600">
                  Collaboration, transparency, innovation, and sustainability guide everything we do. We believe in the
                  power of open science and community-driven solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Amba Net was born from a simple observation: Africa needed better access to climate data and research
                  tools. Despite being the continent most affected by climate change, African researchers and
                  policymakers often lacked the resources and platforms needed to monitor, analyze, and respond to
                  climate challenges effectively.
                </p>
                <p>
                  Founded in 2020 by a consortium of leading African universities and research institutions, Amba Net
                  set out to change this narrative. We began by connecting researchers across the continent, providing
                  them with a platform to share data, collaborate on projects, and publish their findings.
                </p>
                <p>
                  Today, Amba Net serves over 800 researchers across 54 African countries, providing real-time climate
                  data, predictive analytics, and collaborative tools that are making a real difference in how Africa
                  responds to climate change.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-green-600 mb-2">54</div>
                    <div className="text-gray-600">Countries Covered</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-blue-600 mb-2">800+</div>
                    <div className="text-gray-600">Active Researchers</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-purple-600 mb-2">3,456</div>
                    <div className="text-gray-600">Research Papers</div>
                  </CardContent>
                </Card>
                <Card className="p-6 text-center">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-orange-600 mb-2">1,247</div>
                    <div className="text-gray-600">Data Stations</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in building Africa's premier climate platform</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <Card className="p-6">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Leading experts in climate science, technology, and policy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">Collaborating with leading institutions across Africa and beyond</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold">NASA</div>
              <div className="text-sm text-gray-600">Data Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">ICRISAT</div>
              <div className="text-sm text-gray-600">Research Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">University of Nairobi</div>
              <div className="text-sm text-gray-600">Academic Partner</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">UNEP</div>
              <div className="text-sm text-gray-600">Policy Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Be part of the solution. Join thousands of researchers, policymakers, and organizations working together for
            a climate-resilient Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
