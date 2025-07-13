"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Map, BookOpen, Newspaper, Users, User, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const publicRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/map", label: "Climate Map", icon: Map },
    { href: "/research", label: "Research", icon: BookOpen },
    { href: "/news", label: "Climate News", icon: Newspaper },
    { href: "/alerts", label: "Alerts", icon: AlertTriangle },
  ]

  const userRoutes = [
    { href: "/collab", label: "Collaboration", icon: Users },
    { href: "/profile", label: "My Profile", icon: User },
  ]

  const adminRoutes = [{ href: "/admin", label: "Admin Panel", icon: Shield }]

  const allRoutes = [...publicRoutes, ...(user ? userRoutes : []), ...(user?.role === "admin" ? adminRoutes : [])]

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-2">
        {allRoutes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant={pathname === route.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-green-600 text-white hover:bg-green-700",
              )}
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}
