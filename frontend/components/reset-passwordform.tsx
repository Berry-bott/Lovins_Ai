'use client'

import { Lock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations'
import { useState, useEffect } from 'react'
import { authApi } from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Invalid reset token. Please request a new password reset link.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const result = await authApi.resetPassword({ token, password })

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
  }

  return (
    <>
      <motion.div className="mb-8" variants={itemVariants}>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">Set new password</h1>
        <p className="text-muted-foreground">
          Enter your new password below.
        </p>
      </motion.div>

      {!success ? (
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
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={loading}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">At least 8 characters</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={loading}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading || !token}
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
                  Resetting...
                </>
              ) : (
                'Reset Password'
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
            <h2 className="text-lg font-semibold text-foreground mb-2">Password reset successful!</h2>
            <p className="text-sm text-muted-foreground">
              Your password has been updated. Redirecting you to sign in...
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}