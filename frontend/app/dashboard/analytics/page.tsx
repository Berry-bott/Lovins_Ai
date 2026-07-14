'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Calendar, TrendingUp, Users, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your automation performance metrics</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <select className="bg-transparent text-foreground focus:outline-none text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Messages',
              value: '42,857',
              change: '+12.5%',
              icon: TrendingUp,
            },
            {
              title: 'Active Users',
              value: '3,241',
              change: '+8.2%',
              icon: Users,
            },
            {
              title: 'Avg Response Time',
              value: '1.2s',
              change: '-0.3s',
              icon: Clock,
            },
            {
              title: 'Success Rate',
              value: '94.2%',
              change: '+2.1%',
              icon: TrendingUp,
            },
          ].map((kpi, idx) => {
            const Icon = kpi.icon
            return (
              <div key={idx} className="bg-card rounded-xl border border-border p-3">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Message Volume Chart */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h2 className="text-lg font-semibold text-foreground mb-6">Message Volume (Last 7 Days)</h2>
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {[65, 72, 68, 85, 72, 90, 78].map((height, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-card rounded-xl border border-border p-3">
            <h2 className="text-lg font-semibold text-foreground mb-6">Response Time Distribution</h2>
            <div className="space-y-4">
              {[
                { label: '< 0.5s', percentage: 45, color: 'from-green-400 to-green-500' },
                { label: '0.5s - 1s', percentage: 35, color: 'from-blue-400 to-blue-500' },
                { label: '1s - 2s', percentage: 15, color: 'from-yellow-400 to-yellow-500' },
                { label: '> 2s', percentage: 5, color: 'from-red-400 to-red-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-primary">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bot Performance Table */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-lg font-semibold text-foreground mb-6">Bot Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Bot Name</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Messages</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Avg Response</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Customer Support Bot', messages: 2450, response: '1.1s', success: '95.2%', trend: '↑ 3.2%' },
                  { name: 'Sales Lead Bot', messages: 1850, response: '0.9s', success: '92.8%', trend: '↑ 1.5%' },
                  { name: 'Appointment Scheduler', messages: 890, response: '1.5s', success: '91.4%', trend: '↓ 0.8%' },
                ].map((bot, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{bot.name}</td>
                    <td className="py-3 px-4 text-foreground">{bot.messages}</td>
                    <td className="py-3 px-4 text-foreground">{bot.response}</td>
                    <td className="py-3 px-4 text-foreground">{bot.success}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${bot.trend.includes('↑') ? 'text-green-500' : 'text-red-500'}`}>
                        {bot.trend}
                      </span>
                    </td>
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
