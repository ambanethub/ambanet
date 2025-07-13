"use client"

import { BarChart3, Map, BookOpen, Newspaper, Users, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Dashboard } from "@/components/dashboard/dashboard"
import { ClimateMap } from "@/components/map/climate-map"
import { ResearchRepository } from "@/components/research/research-repository"
import { ClimateNews } from "@/components/news/climate-news"
import { CollaborationCenter } from "@/components/collaboration/collaboration-center"
import { UserDashboard } from "@/components/user/user-dashboard"
import { AdminPanel } from "@/components/admin/admin-panel"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { user } = useAuth()

  const publicTabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, component: Dashboard },
    { id: "map", label: "Climate Map", icon: Map, component: ClimateMap },
    { id: "research", label: "Research", icon: BookOpen, component: ResearchRepository },
    { id: "news", label: "Climate News", icon: Newspaper, component: ClimateNews },
  ]

  const userTabs = [
    { id: "collaboration", label: "Collaboration", icon: Users, component: CollaborationCenter },
    { id: "profile", label: "My Dashboard", icon: User, component: UserDashboard },
  ]

  const adminTabs = [{ id: "admin", label: "Admin Panel", icon: Shield, component: AdminPanel }]

  const allTabs = [...publicTabs, ...(user ? userTabs : []), ...(user?.role === "admin" ? adminTabs : [])]

  const ActiveComponent = allTabs.find((tab) => tab.id === activeTab)?.component || Dashboard

  return (
    <div className="flex">
      <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
        <div className="space-y-2">
          {allTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="flex-1">
        <ActiveComponent />
      </div>
    </div>
  )
}
