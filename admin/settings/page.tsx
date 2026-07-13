'use client'

import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Toggle, Trash2, Download, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoSuspend, setAutoSuspend] = useState(true)
  const [inactivityDays, setInactivityDays] = useState(90)

  return (
    <AdminLayout>
      <motion.div
        className="space-y-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Platform Configuration */}
        <motion.div
          className="bg-background border border-border rounded-xl p-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Platform Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="ChatFlow AI"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@chatflow.ai"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Maintenance Mode */}
        <motion.div
          className="bg-background border border-border rounded-xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Temporarily disable platform access for all users
              </p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                maintenanceMode ? 'bg-red-500' : 'bg-secondary'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  maintenanceMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {maintenanceMode && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-600">Platform is currently in maintenance mode</p>
            </div>
          )}
        </motion.div>

        {/* User Policies */}
        <motion.div
          className="bg-background border border-border rounded-xl p-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">User Policies</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Auto-Suspend Inactive Users</h3>
                <p className="text-sm text-muted-foreground mt-1">Automatically suspend users after extended inactivity</p>
              </div>
              <button
                onClick={() => setAutoSuspend(!autoSuspend)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  autoSuspend ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    autoSuspend ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {autoSuspend && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Inactivity Threshold (days)</label>
                <input
                  type="number"
                  value={inactivityDays}
                  onChange={(e) => setInactivityDays(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* API Settings */}
        <motion.div
          className="bg-background border border-border rounded-xl p-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">API Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Automations per User</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rate Limit (requests/minute)</label>
              <input
                type="number"
                defaultValue="60"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          className="bg-background border border-destructive/50 rounded-xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export All Data
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2 font-medium">
              <Trash2 className="w-4 h-4" />
              Clear Cache
            </button>
            <button className="w-full px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors font-medium">
              Reset Platform
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
