"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Users, Building, Globe, ArrowRight, Zap, Shield, Headphones } from "lucide-react"

export function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for students and individual researchers",
      features: [
        "Basic climate data access",
        "Limited map visualizations",
        "Community forum access",
        "5 research paper downloads/month",
        "Basic alerts (email only)",
        "Standard support",
      ],
      limitations: ["No API access", "No collaboration tools", "No custom reports", "No priority support"],
      cta: "Get Started Free",
      popular: false,
      icon: Users,
    },
    {
      name: "Researcher",
      price: "$29",
      period: "per month",
      description: "For active researchers and small teams",
      features: [
        "Full climate data access",
        "Advanced map visualizations",
        "Research collaboration tools",
        "Unlimited paper downloads",
        "Custom alert configurations",
        "API access (1,000 calls/month)",
        "Project management tools",
        "Priority email support",
        "Data export capabilities",
      ],
      limitations: ["Limited to 5 team members", "Basic analytics only"],
      cta: "Start Free Trial",
      popular: true,
      icon: Star,
    },
    {
      name: "Institution",
      price: "$99",
      period: "per month",
      description: "For universities and research institutions",
      features: [
        "Everything in Researcher plan",
        "Unlimited team members",
        "Advanced analytics & AI insights",
        "Custom dashboards",
        "API access (10,000 calls/month)",
        "White-label options",
        "Dedicated account manager",
        "Phone & chat support",
        "Custom integrations",
        "Training & onboarding",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      icon: Building,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations and governments",
      features: [
        "Everything in Institution plan",
        "Unlimited API access",
        "Custom data sources",
        "On-premise deployment options",
        "Advanced security features",
        "Custom SLA agreements",
        "24/7 dedicated support",
        "Custom feature development",
        "Multi-region data hosting",
        "Compliance certifications",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      icon: Globe,
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for the Researcher plan. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, bank transfers, and can accommodate institutional purchase orders for annual plans.",
    },
    {
      question: "Do you offer discounts for educational institutions?",
      answer:
        "Yes, we provide special pricing for educational institutions and non-profit organizations. Contact our sales team for details.",
    },
    {
      question: "What happens if I exceed my API limits?",
      answer:
        "We'll notify you when you approach your limits. You can upgrade your plan or purchase additional API calls as needed.",
    },
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
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From individual researchers to large institutions, we have a plan that fits your needs. Start free and scale
            as you grow.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-gray-600">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform"></div>
            </div>
            <span className="text-gray-600">Annual</span>
            <Badge variant="secondary" className="text-xs">
              Save 20%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-6 ${plan.popular ? "ring-2 ring-green-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="p-0 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <plan.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="p-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-start">
                        <X className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Features</h2>
            <p className="text-xl text-gray-600">Detailed comparison of what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Features</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold">Researcher</th>
                  <th className="text-center p-4 font-semibold">Institution</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Climate Data Access</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">Full</td>
                  <td className="text-center p-4">Full</td>
                  <td className="text-center p-4">Full + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">API Calls per Month</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">1,000</td>
                  <td className="text-center p-4">10,000</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Team Members</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4">5</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support Level</td>
                  <td className="text-center p-4">Community</td>
                  <td className="text-center p-4">Email</td>
                  <td className="text-center p-4">Phone + Chat</td>
                  <td className="text-center p-4">24/7 Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Add-ons & Services</h2>
            <p className="text-xl text-gray-600">Enhance your plan with additional services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Additional API Calls</h3>
                <p className="text-gray-600 mb-4">Need more API access? Purchase additional calls as needed.</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">$0.01 per call</p>
                <Button variant="outline">Add to Plan</Button>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Security</h3>
                <p className="text-gray-600 mb-4">Enhanced security features and compliance certifications.</p>
                <p className="text-2xl font-bold text-purple-600 mb-4">$50/month</p>
                <Button variant="outline">Add to Plan</Button>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Training & Consulting</h3>
                <p className="text-gray-600 mb-4">Expert training and consulting services for your team.</p>
                <p className="text-2xl font-bold text-orange-600 mb-4">$200/hour</p>
                <Button variant="outline">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our pricing and plans</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
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
            Join thousands of researchers using Amba Net to advance climate science in Africa.
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
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
