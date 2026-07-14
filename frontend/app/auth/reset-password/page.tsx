import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion } from 'framer-motion'
import { pageVariants, containerVariants } from '@/lib/animations'
import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/reset-passwordform'

function LoadingFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="h-4 w-24 bg-muted rounded mb-4"></div>
        <div className="h-8 w-3/4 bg-muted rounded mb-2"></div>
        <div className="h-4 w-full bg-muted rounded"></div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
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
          <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>
      </div>
    </motion.div>
  )
}