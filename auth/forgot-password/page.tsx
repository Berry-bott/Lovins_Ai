'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'
import { useState } from 'react'
import { authApi } from '@/lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [resetUrl, setResetUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await authApi.forgotPassword(email)

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setSent(true)
    if (result.data?.resetUrl) {
      setResetUrl(result.data.resetUrl)
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-background flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-border">
        <Link href="/" className="text-2xl font-extrabold">
          Lovin's AI
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </motion.div>

          {!sent ? (
            <>
              {/* Error Message */}
              {error && (
                <motion.div
                  className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      disabled={loading}
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                    />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </motion.button>
              </motion.form>
            </>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-foreground mb-2">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                  If an account with that email exists, we've sent a password reset link.
                </p>
              </div>

              {/* In development mode, show the reset URL */}
              {resetUrl && (
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    🔧 Development Mode — Reset Link:
                  </p>
                  <a
                    href={resetUrl}
                    className="text-sm text-primary hover:text-primary/80 break-all font-medium"
                  >
                    {resetUrl}
                  </a>
                </div>
              )}

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Return to sign in
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}