'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard-layout'
import { AdminLayout } from '@/components/admin-layout'
import { DollarSign, Users, Zap, TrendingUp, ArrowUpRight } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function AdminPage() {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$127,350.00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Active Users',
      value: '874',
      change: '+8.2%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Monthly Recurring',
      value: '$47,850.50',
      change: '+5.4%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Total Automations',
      value: '5,234',
      change: '+18.9%',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const recentUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@company.com', plan: 'Professional', revenue: '$99/mo', date: 'Today' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@startup.io', plan: 'Enterprise', revenue: '$299/mo', date: 'Yesterday' },
    { id: 3, name: 'Marcus Brown', email: 'marcus@biz.com', plan: 'Starter', revenue: '$29/mo', date: '2 days ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@corp.com', plan: 'Professional', revenue: '$99/mo', date: '3 days ago' },
    { id: 5, name: 'James Wilson', email: 'james@enterprise.com', plan: 'Enterprise', revenue: '$299/mo', date: '4 days ago' },
  ]

  return (
    <AdminLayout>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                className="bg-background border border-border rounded-xl p-6"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Recent Users */}
        <motion.div
          className="bg-background border border-border rounded-xl p-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Signups</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground">{user.revenue}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
