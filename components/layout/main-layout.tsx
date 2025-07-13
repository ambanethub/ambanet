"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "./navigation"
import { Header } from "./header"
import { useAuth } from "@/components/auth/auth-provider"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
