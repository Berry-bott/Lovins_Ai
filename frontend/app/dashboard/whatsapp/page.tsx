'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { CheckCircle, AlertCircle, QrCode, Smartphone } from 'lucide-react'

export default function WhatsAppPage() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Connection</h1>
          <p className="text-muted-foreground mt-1">Manage your WhatsApp Business account connections</p>
        </div>

        {/* Connected Status */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">WhatsApp Connected</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your WhatsApp Business account is successfully connected
              </p>
              <div className="bg-secondary/50 rounded-lg p-3 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Number:</span>
                  <span className="text-foreground font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Name:</span>
                  <span className="text-foreground font-medium">My Business</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connected Since:</span>
                  <span className="text-foreground font-medium">Dec 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Phone Numbers</h2>
          <div className="space-y-3">
            {[
              { number: '+1 (555) 123-4567', bots: 3, status: 'Active' },
              { number: '+1 (555) 987-6543', bots: 2, status: 'Inactive' },
            ].map((phone, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{phone.number}</p>
                    <p className="text-sm text-muted-foreground">{phone.bots} active bots</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    phone.status === 'Active'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {phone.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 px-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
            Add Phone Number
          </button>
        </div>

        {/* Webhook Settings */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Webhook Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Webhook URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://api.chatflowai.com/webhooks/whatsapp"
                  readOnly
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground text-sm font-mono"
                />
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-sm">
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Verify Token</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="••••••••••••••••"
                  readOnly
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground text-sm"
                />
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors text-sm">
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">API Configuration</h2>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Make sure to configure your webhook settings in the WhatsApp Business API dashboard to receive incoming messages.
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm font-mono text-foreground mb-2">POST /webhooks/whatsapp</p>
              <p className="text-xs text-muted-foreground">
                All incoming messages from your WhatsApp Business number will be sent to this endpoint
              </p>
            </div>
          </div>

          <button className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Test Webhook
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
