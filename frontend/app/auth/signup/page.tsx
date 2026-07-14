'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'
import { useState } from 'react'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!formData.terms) {
      setError('Please agree to the terms and conditions')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setSuccess(false)

    const result = await authApi.signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.data) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
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
        <Link href="/" className="text-2xl font-extrabold ">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join thousands automating with Lovin's AI</p>
          </motion.div>

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
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

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
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">At least 8 characters with uppercase and numbers</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-2" variants={itemVariants}>
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                disabled={loading || success}
                className="w-4 h-4 rounded border-border text-primary accent-primary mt-1 disabled:opacity-50 transition-all cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            {success ? (
              <motion.div
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle className="w-5 h-5" />
                Account Created!
              </motion.div>
            ) : (
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            )}
          </motion.form>

          {/* Benefits */}
          <motion.div className="mt-8 space-y-3 pt-8 border-t border-border" variants={itemVariants}>
            {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((benefit, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center gap-2 text-sm text-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                {benefit}
              </motion.div>
            ))}
          </motion.div>

          {/* Sign In Link */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}