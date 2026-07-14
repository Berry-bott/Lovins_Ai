'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { motion } from 'framer-motion'
import { Plus, ExternalLink, Trash2, RefreshCw } from 'lucide-react'
import { botConnectionApi, type BotConnection } from '@/lib/api'

export default function TelegramBotsPage() {
  const router = useRouter()
  const [connections, setConnections] = useState<BotConnection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    try {
      const result = await botConnectionApi.listConnections()
      if (result.error) {
        setError(result.error)
      } else if (result.data?.connections) {
        setConnections(result.data.connections.filter(c => c.platform === 'TELEGRAM'))
      }
    } catch (err) {
      setError('Failed to load connections')
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (id: string) => {
    if (!confirm('Are you sure you want to disconnect this bot?')) return

    const result = await botConnectionApi.disconnectBot(id)
    if (result.error) {
      setError(result.error)
    } else {
      await loadConnections()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'PENDING_TOKEN':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'ERROR':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'DISCONNECTED':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Telegram Bots</h1>
              <p className="text-muted-foreground">Manage your connected Telegram bots</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/platforms/telegram/connect')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Connect Bot
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : connections.length === 0 ? (
            /* Empty State */
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No bots connected yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Connect your first Telegram bot to get started with your AI Personal Assistant.
              </p>
              <button
                onClick={() => router.push('/dashboard/platforms/telegram/connect')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Connect Your First Bot
              </button>
            </div>
          ) : (
            /* Bot List */
            <div className="grid gap-4">
              {connections.map((connection) => (
                <motion.div
                  key={connection.id}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 3.52-1.35 5.89-2.24 7.1-2.65 3.03-1.05 3.66-1.23 4.07-1.24.1 0 .33.02.48.14.12.1.15.23.17.33-.01.06.01.24 0 .38z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          @{connection.credentials.botUsername || 'Unknown'}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(connection.status)}`}>
                            {connection.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Connected on {new Date(connection.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {connection.credentials.botUsername && (
                        <a
                          href={`https://t.me/${connection.credentials.botUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                          title="Open in Telegram"
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDisconnect(connection.id)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        title="Disconnect"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}