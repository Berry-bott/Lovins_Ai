'use client'

import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Plus, MoreVertical, Trash2, Edit, Play, Pause, ExternalLink } from 'lucide-react'
import { botConnectionApi, type BotConnection } from '@/lib/api'
import { motion } from 'framer-motion'

export default function BotsPage() {
  const [bots, setBots] = useState<BotConnection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBots()
  }, [])

  const loadBots = async () => {
    try {
      const result = await botConnectionApi.listConnections()
      if (result.data?.connections) {
        setBots(result.data.connections.filter(c => c.platform === 'TELEGRAM'))
      }
    } catch (err) {
      console.error('Failed to load bots:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-primary'
      case 'PENDING_TOKEN':
        return 'bg-yellow-500/20 text-yellow-500'
      case 'ERROR':
        return 'bg-red-500/20 text-red-500'
      case 'DISCONNECTED':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Bots</h1>
            <p className="text-muted-foreground mt-1">Manage your connected Telegram bots</p>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard/platforms/telegram/connect'}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Connect Bot
          </button>
        </div>

        {/* Bots Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bots.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
            <Plus className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Bots Connected</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Connect your first Telegram bot to get started with your AI Personal Assistant
            </p>
            <button
              onClick={() => window.location.href = '/dashboard/platforms/telegram/connect'}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Connect Your First Bot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {bots.map((bot) => (
              <motion.div
                key={bot.id}
                className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      @{bot.credentials.botUsername || 'Unknown'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Telegram Bot</p>
                  </div>
                  <div className="relative group">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-10">
                      <a
                        href={`https://t.me/${bot.credentials.botUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors text-sm text-foreground"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in Telegram
                      </a>
                      <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors text-sm text-foreground">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors text-sm text-destructive border-t border-border">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bot.status)}`}
                    >
                      {bot.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Platform</span>
                    <span className="font-medium text-foreground">Telegram</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Connected</span>
                    <span className="font-medium text-foreground">
                      {new Date(bot.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://t.me/${bot.credentials.botUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Bot in Telegram
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}