'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { botConnectionApi } from '@/lib/api'

export default function ConnectTelegramPage() {
  const router = useRouter()
  const [botToken, setBotToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [botUsername, setBotUsername] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await botConnectionApi.connectTelegram({ botToken })

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.data?.connection.credentials.botUsername) {
      setBotUsername(result.data.connection.credentials.botUsername)
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8 py-16">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Bot Connected!</h1>
              <p className="text-muted-foreground mb-6">
                Your Telegram bot <span className="font-semibold text-foreground">@{botUsername}</span> has been connected successfully.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Next Steps</h2>
                <ol className="text-left text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Open Telegram and search for <span className="font-semibold text-foreground">@{botUsername}</span></li>
                  <li>Start a conversation by sending <span className="font-semibold text-foreground">/start</span></li>
                  <li>Your AI Personal Assistant is now ready to help!</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://t.me/${botUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Open Bot in Telegram
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => router.push('/dashboard/bots')}
                  className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  View All Bots
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 py-16">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Connect Telegram Bot</h1>
            <p className="text-muted-foreground">
              Connect your Telegram bot to get started with your AI Personal Assistant.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">How to get your bot token</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">1</span>
                  <span>Open Telegram and search for <span className="font-semibold text-foreground">@BotFather</span></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">2</span>
                  <span>Send the command <span className="font-mono bg-secondary px-2 py-1 rounded">/newbot</span> to create a new bot</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">3</span>
                  <span>Follow the prompts to name your bot and set a username</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">4</span>
                  <span>Copy the bot token BotFather gives you (looks like <span className="font-mono text-xs">123456789:ABCdefGhIJKlmNoPQRsTUVwxyz</span>)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">5</span>
                  <span>Paste the token below and click "Connect Bot"</span>
                </li>
              </ol>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Connection failed</p>
                  <p className="text-sm text-destructive/80 mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="botToken" className="block text-sm font-medium text-foreground mb-2">
                  Bot Token
                </label>
                <input
                  id="botToken"
                  type="text"
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyz"
                  value={botToken}
                  onChange={(e) => {
                    setBotToken(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Paste the token you received from @BotFather
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !botToken}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Connect Bot
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}