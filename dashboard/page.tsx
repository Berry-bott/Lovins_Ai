'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MessageSquare, Zap, TrendingUp, Activity } from 'lucide-react'
import { authApi, type User } from '@/lib/api'

interface StatCard {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    authApi.getMe().then(result => {
      if (result.data?.user) {
        setUser(result.data.user)
      }
    })
  }, [])

  const stats: StatCard[] = [
    {
      title: 'Total Messages',
      value: '42,857',
      change: '+12.5% from last week',
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Active Automations',
      value: '24',
      change: '+3 this month',
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Response Rate',
      value: '94.2%',
      change: '+2.1% improvement',
      icon: <Activity className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Revenue Generated',
      value: '$12,450',
      change: '+28% from last month',
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
  ]

  const chartData = [
    { day: 'Mon', messages: 65 },
    { day: 'Tue', messages: 72 },
    { day: 'Wed', messages: 68 },
    { day: 'Thu', messages: 85 },
    { day: 'Fri', messages: 72 },
    { day: 'Sat', messages: 90 },
    { day: 'Sun', messages: 78 },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your automations today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl border border-border p-3 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">{stat.icon}</div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
              <div className="mb-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <p className="text-xs text-primary">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Message Activity (Last 7 Days)</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="messages" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/dashboard/bots')}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                Create New Bot
              </button>
              <button 
                onClick={() => router.push('/dashboard/platforms')}
                className="w-full py-2 px-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors text-sm"
              >
                Connect WhatsApp
              </button>
              <button 
                onClick={() => router.push('/dashboard/analytics')}
                className="w-full py-2 px-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors text-sm"
              >
                View Documentation
              </button>
            </div>

            {/* Plan Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-semibold text-foreground mb-2">Current Plan</p>
              <p className="text-sm text-muted-foreground mb-3">Professional - $99/month</p>
              <button 
                onClick={() => router.push('/dashboard/settings')}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Upgrade to Enterprise →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Bots */}
        <div className="mt-6 bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Bots</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Bot Name</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Messages</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Customer Support Bot', messages: 2450, status: 'Active', time: '1.2s' },
                  { name: 'Sales Lead Bot', messages: 1850, status: 'Active', time: '0.8s' },
                  { name: 'Appointment Scheduler', messages: 890, status: 'Inactive', time: 'N/A' },
                ].map((bot, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer">
                    <td className="py-3 px-4 text-foreground">{bot.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{bot.messages}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          bot.status === 'Active'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {bot.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{bot.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}