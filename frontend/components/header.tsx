// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { ThemeToggle } from '@/components/theme-toggle'
// import { motion } from 'framer-motion'

// const NAV_LINKS = [
//   { href: '/about', label: 'About' },
//   { href: '/blog', label: 'Blog' },
//   { href: '/resources', label: 'Resources' },
//   { href: '/testimonials', label: 'Testimonials' },
//   { href: '/pricing', label: 'Pricing' },
// ]

// export function Header() {
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20)
//     onScroll()
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   return (
//     <div className="sticky top-0 z-40 flex justify-center px-4">
//       <motion.header
//         animate={{
//           width: scrolled ? '80%' : '100%',
//           marginTop: scrolled ? 16 : 0,
//           borderRadius: scrolled ? 999 : 0,
//         }}
//         transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
//         className={`bg-background/95 backdrop-blur-sm max-w-7xl ${
//           scrolled ? 'border border-border shadow-lg' : ''
//         }`}
//       >
//         <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <Link href="/" className="flex items-center gap-2">
//             <span className="font-extrabold text-2xl hidden sm:inline">Lovin's</span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-8">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm hover:text-primary transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-4">
//             <ThemeToggle />
//             <Link
//               href="/auth/login"
//               className="text-sm px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </motion.header>
//     </div>
//   )
// }







'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/pricing', label: 'Pricing' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on scroll or resize
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close)
      window.removeEventListener('resize', close)
    }
  }, [])

  return (
    <div className="sticky top-0 z-40 flex justify-center md:px-4">
      <motion.header
        animate={{
          width: scrolled ? '90%' : '100%',
          marginTop: scrolled ? 16 : 0,
          borderRadius: scrolled ? 24 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className={`bg-background/95 backdrop-blur-sm max-w-7xl w-full ${
          scrolled ? 'border border-border shadow-lg' : ''
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl">Lovin's AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="hidden sm:inline-block text-sm px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="flex flex-col px-4 sm:px-6 py-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm py-3 px-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm py-3 px-2 mt-2 rounded-lg bg-primary text-primary-foreground text-center font-semibold"
                >
                  Sign In
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  )
}