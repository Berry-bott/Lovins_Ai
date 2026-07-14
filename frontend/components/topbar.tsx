'use client'

import { ThemeToggle } from './theme-toggle'
import { Menu, X } from 'lucide-react'
import { type User } from '@/lib/api'

interface TopbarProps {
  user?: User | null
  onMenuClick?: () => void
  sidebarOpen?: boolean
}

export function Topbar({ user, onMenuClick, sidebarOpen }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 z-40">
      <h1 className="text-2xl font-extrabold">
        Lovin's AI  
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">{user.name}</span>
          </div>
        )}
        <ThemeToggle />
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}