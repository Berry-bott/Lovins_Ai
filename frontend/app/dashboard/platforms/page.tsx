'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Heart, Send, Check, Plus, Settings } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { containerVariants, itemVariants } from '@/lib/animations'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PLATFORMS = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
    description: 'Customer support, sales, and marketing automation on WhatsApp',
    features: ['Auto-replies', 'Lead qualification', 'Order updates', 'Customer support'],
    status: 'connected',
  },
  {
    name: 'Telegram',
    icon: Check,
    color: '#0088CC',
    description: 'Automate customer support, notifications, and community engagement on Telegram',
    features: [
      'Auto-replies',
      'Bot commands',
      'Channel notifications',
      'Customer support'
    ],
    status: 'connected',
  },
  {
    name: 'Email',
    icon: Mail,
    color: '#EA4335',
    description: 'Intelligent email sequences and drip campaigns',
    features: ['Welcome series', 'Abandoned cart', 'Newsletters', 'Re-engagement'],
    status: 'available',
  },
  {
    name: 'Instagram',
    icon: Heart,
    color: '#E4405F',
    description: 'Automate DMs and engage with your followers',
    features: ['DM automation', 'Comment replies', 'Story interactions', 'Lead capture'],
    status: 'available',
  },
  {
    name: 'Slack',
    icon: Send,
    color: '#36C5F0',
    description: 'Streamline team workflows with intelligent automation',
    features: ['Notifications', 'Reminders', 'Data summaries', 'Task automation'],
    status: 'available',
  },
]

export default function PlatformsPage() {
  const router = useRouter()
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [showModal, setShowModal] = useState<string | null>(null)

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="md:text-3xl text-2xl font-black mb-4 " variants={itemVariants}>
            Choose Your Platforms
          </motion.h1>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            Select the platforms you want to automate. You can add or remove platforms anytime.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon
            const isSelected = selectedPlatforms.includes(platform.name)

            return (
              <motion.div
                key={platform.name}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                variants={itemVariants}
                onClick={() => togglePlatform(platform.name)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (platform.name === 'Telegram') {
                          router.push('/dashboard/platforms/telegram/connect')
                        } else {
                          setShowModal(platform.name)
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Configure
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://docs.chatflow.ai/${platform.name.toLowerCase()}`, '_blank')
                      }}
                      className="px-3 py-2 bg-secondary hover:bg-muted rounded-lg font-medium text-sm transition-colors"
                    >
                      Docs
                    </button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Selected Platforms Summary */}
        <motion.div
          className="mt-12 p-8 bg-secondary/30 rounded-2xl border border-border"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>
            Your Active Platforms
          </motion.h2>
          <motion.div className="flex flex-wrap gap-3 mb-6" variants={containerVariants}>
            {selectedPlatforms.length > 0 ? (
              selectedPlatforms.map((platform) => {
                const platformData = PLATFORMS.find((p) => p.name === platform)
                const Icon = platformData?.icon || MessageCircle

                return (
                  <motion.div
                    key={platform}
                    className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border"
                    variants={itemVariants}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{platform}</span>
                  </motion.div>
                )
              })
            ) : (
              <p className="text-muted-foreground">No platforms selected</p>
            )}
          </motion.div>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected.
            You can add up to 4 platforms with your plan.
          </motion.p>
        </motion.div>

        {/* Recent Automations */}
        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-2xl font-bold mb-6" variants={itemVariants}>
            Quick Start
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {[
              {
                title: 'Create First Bot',
                desc: 'Set up your first automation',
                action: 'Create Bot',
              },
              {
                title: 'Watch Tutorial',
                desc: 'Learn platform basics',
                action: 'Watch Now',
              },
              {
                title: 'Read Documentation',
                desc: 'Explore advanced features',
                action: 'Read Docs',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <button className="text-primary font-semibold text-sm hover:opacity-75 transition-opacity">
                  {item.action} →
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Configuration Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(null)}
        >
          <motion.div
            className="bg-background rounded-2xl max-w-md w-full p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Configure {showModal}</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Webhook URL</label>
                <input
                  type="text"
                  placeholder="https://your-domain.com/webhook"
                  className="w-full px-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 px-4 py-2 bg-secondary hover:bg-muted rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Save Configuration
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
