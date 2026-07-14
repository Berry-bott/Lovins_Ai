'use client'

import { AdminSidebar } from './admin-sidebar'
import { ThemeToggle } from './theme-toggle'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64">
        {/* Admin Topbar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <h2 className="text-lg font-semibold text-foreground">ChatFlow AI Admin</h2>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
