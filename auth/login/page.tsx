'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'
import { useState } from 'react'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error when user types
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await authApi.login({
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.data) {
      router.push('/dashboard')
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Lovin's AI account</p>
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
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-all"
                />
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4 rounded border-border text-primary accent-primary disabled:opacity-50 transition-all cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
                Remember me
              </label>
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div className="my-6 relative" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <button
              type="button"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.547 3.029 8.397 7.154 9.338.524.096.715-.228.715-.505 0-.249-.009-.905-.014-1.78-2.908.631-3.523-1.4-3.523-1.4-.477-1.209-1.163-1.53-1.163-1.53-.949-.648.072-.635.072-.635 1.048.074 1.599 1.076 1.599 1.076.932 1.596 2.445 1.136 3.041.868.095-.675.365-1.136.664-1.397-2.322-.264-4.76-1.161-4.76-5.16 0-1.14.407-2.072 1.076-2.803-.108-.264-.467-1.325.101-2.763 0 0 .878-.281 2.875.867.834-.231 1.729-.347 2.617-.352.888.005 1.783.121 2.617.352 1.996-1.148 2.872-.867 2.872-.867.569 1.438.21 2.499.103 2.763.671.731 1.075 1.663 1.075 2.803 0 4.01-2.442 4.892-4.77 5.148.375.323.711.964.711 1.942 0 1.403-.013 2.534-.013 2.88 0 .278.189.605.72.502C16.971 18.395 20 14.546 20 10c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
            <button
              type="button"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M19.6 10.23c0-.82-.15-1.42-.3-1.5h-9.4v2.6h5.5c0 .82-.6 2.06-2.64 2.9v3.5h4.28c2.3-2.1 3.56-5.17 3.56-8.5z" />
                <path d="M10.3 15.13c-.72 0-1.35-.19-1.84-.53v3.5H5.7c1.92-1.76 3.05-4.34 3.05-7.41 0-.64-.06-1.25-.16-1.84H10.3v2.28" />
              </svg>
              Google
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}