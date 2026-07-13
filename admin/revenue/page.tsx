'use client'

import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { DollarSign, TrendingUp, Users, BarChart3 } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function AdminRevenuePage() {
  const metrics = [
    {
      label: 'Monthly Recurring Revenue',
      value: '$47,850.50',
      change: '+5.4%',
      icon: DollarSign,
    },
    {
      label: 'Total All-Time Revenue',
      value: '$127,350.00',
      change: '+12.5%',
      icon: TrendingUp,
    },
    {
      label: 'Average Customer Value',
      value: '$1,456.89',
      change: '+8.2%',
      icon: Users,
    },
    {
      label: 'Churn Rate',
      value: '2.3%',
      change: '-0.8%',
      icon: BarChart3,
    },
  ]

  const plans = [
    { name: 'Starter', count: 234, revenue: '$6,786/mo', percentage: 14 },
    { name: 'Professional', count: 456, revenue: '$45,144/mo', percentage: 60 },
    { name: 'Enterprise', count: 184, revenue: '$54,920/mo', percentage: 26 },
  ]

  const paymentMethods = [
    { method: 'Credit Card', percentage: 78, amount: '$37,323.39' },
    { method: 'PayPal', percentage: 16, amount: '$7,656.08' },
    { method: 'Wire Transfer', percentage: 6, amount: '$2,871.03' },
  ]

  return (
    <AdminLayout>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* KPI Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={idx}
                className="bg-background border border-border rounded-xl p-6"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-semibold text-emerald-600">{metric.change}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Plans & Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plans */}
          <motion.div
            className="bg-background border border-border rounded-xl p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Plan</h3>
            <div className="space-y-4">
              {plans.map((plan, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{plan.name}</span>
                    <span className="text-sm text-muted-foreground">{plan.revenue}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${plan.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{plan.count} customers</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            className="bg-background border border-border rounded-xl p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{method.method}</span>
                    <span className="text-sm font-semibold text-foreground">{method.amount}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{method.percentage}% of revenue</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
