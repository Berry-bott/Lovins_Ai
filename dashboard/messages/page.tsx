'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Search, Filter, Download, Eye } from 'lucide-react'

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      message: 'Hi, I need help with my order',
      bot: 'Customer Support Bot',
      time: '2 hours ago',
      status: 'Replied',
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      message: 'Can you schedule an appointment for next week?',
      bot: 'Appointment Scheduler',
      time: '4 hours ago',
      status: 'Pending',
    },
    {
      id: 3,
      sender: 'Mike Davis',
      message: 'I&apos;m interested in your services',
      bot: 'Sales Lead Bot',
      time: '1 day ago',
      status: 'Replied',
    },
    {
      id: 4,
      sender: 'Emma Wilson',
      message: 'When will my package arrive?',
      bot: 'Customer Support Bot',
      time: '2 days ago',
      status: 'Replied',
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">View and manage all WhatsApp messages</p>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Messages', value: '12,450' },
            { label: 'This Week', value: '2,180' },
            { label: 'Avg Response', value: '1.2s' },
            { label: 'Reply Rate', value: '94.2%' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Messages Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Sender</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Message</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Bot</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Time</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{msg.sender}</td>
                    <td className="py-4 px-4 text-foreground max-w-xs truncate">{msg.message}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{msg.bot}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          msg.status === 'Replied'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{msg.time}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="inline-flex items-center justify-center w-8 h-8 hover:bg-secondary rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1-4 of 1,240 messages</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm">1</button>
              <button className="px-3 py-1 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
