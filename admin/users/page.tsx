'use client'

import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Search, Shield, Trash2, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function AdminUsersPage() {
  const [suspendedUsers, setSuspendedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@company.com',
      company: 'Tech Corp',
      plan: 'Professional',
      revenue: '$99/mo',
      automations: 24,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@startup.io',
      company: 'StartupXYZ',
      plan: 'Enterprise',
      revenue: '$299/mo',
      automations: 156,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Marcus Brown',
      email: 'marcus@biz.com',
      company: 'Brown Business',
      plan: 'Starter',
      revenue: '$29/mo',
      automations: 5,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@corp.com',
      company: 'Corporate Inc',
      plan: 'Professional',
      revenue: '$99/mo',
      automations: 42,
      status: 'Active',
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james@enterprise.com',
      company: 'Enterprise Solutions',
      plan: 'Enterprise',
      revenue: '$299/mo',
      automations: 234,
      status: 'Active',
    },
  ]

  const toggleSuspend = (id: number) => {
    setSuspendedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = users.reduce(
    (sum, user) => sum + parseInt(user.revenue.replace(/[$,/mo]/g, '')),
    0
  )

  return (
    <AdminLayout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground mt-1">
                Total Users: {users.length} | Monthly Revenue: ${totalRevenue * 12 / 100}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          className="bg-background border border-border rounded-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Company</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Plan</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Revenue</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Automations</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                    variants={itemVariants}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-foreground">{user.company}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{user.revenue}</td>
                    <td className="py-4 px-6 text-sm text-foreground">{user.automations}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          suspendedUsers.includes(user.id)
                            ? 'bg-red-500/10 text-red-600'
                            : 'bg-emerald-500/10 text-emerald-600'
                        }`}
                      >
                        {suspendedUsers.includes(user.id) ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSuspend(user.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            suspendedUsers.includes(user.id)
                              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600'
                              : 'bg-red-500/10 hover:bg-red-500/20 text-red-600'
                          }`}
                          title={suspendedUsers.includes(user.id) ? 'Reactivate' : 'Suspend'}
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
