'use client'

import { useState, useEffect } from 'react'
import { Topbar } from './topbar'
import { Sidebar } from './sidebar'
import { authApi, type User } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const result = await authApi.getMe()
      if (result.data?.user) {
        setUser(result.data.user)
      } else {
        // Not authenticated, redirect to login
        router.push('/auth/login')
      }
      setLoading(false)
    }
    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await authApi.logout()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <Topbar user={user} sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar user={user} onLogout={handleLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}