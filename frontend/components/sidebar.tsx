'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, MessageSquare, Settings, Zap, Gauge, Bot, LogOut } from 'lucide-react'
import { type User } from '@/lib/api'

interface SidebarProps {
  user?: User | null
  onLogout?: () => void
  isOpen?: boolean
  onClose?: () => void
}

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Gauge },
  { href: '/dashboard/platforms', label: 'Platforms', icon: Zap },
  { href: '/dashboard/bots', label: 'My Bots', icon: Bot },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ user, onLogout, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border lg:static lg:top-auto lg:flex flex-col transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}