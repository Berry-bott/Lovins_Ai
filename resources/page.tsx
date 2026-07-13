'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Play, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, fadeInUp, itemVariants } from '@/lib/animations'
import { useRef, useEffect, useState } from 'react'

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handlePlayClick = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={ref} className="relative aspect-video w-full bg-muted rounded-2xl overflow-hidden group cursor-pointer">
      {isVisible && isLoaded ? (
        <iframe
          src={url}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      ) : (
        <div 
          onClick={handlePlayClick}
          className="w-full h-full flex items-center justify-center bg-black to-primary/5 group-hover:from-primary/30 group-hover:to-primary/15 transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/20 transition-colors"
          >
            <Play className="w-12 h-12 text-primary/30" fill="currentColor" />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Learn</span>
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-6xl font-black mb-8"
            variants={fadeInUp}
          >
            Master <span className="text-primary">automation</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            Video tutorials, documentation, and best practices to help you get the most from Lovin's. Learn how to automate your workflows and save time across all your platforms.
          </motion.p>
        </motion.div>
      </section>

      {/* Video Tutorials */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-black mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Video Tutorials
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Getting Started with Lovin\'s. Learn how to automate your workflows and save time across all your platforms.', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
              { title: 'WhatsApp Automation Setup Guide', url: 'https://www.youtube.com/embed/oUFJJNQGwhk' },
              { title: 'Email Sequence Best Practices', url: 'https://www.youtube.com/embed/9bZkp7q19f0' },
              { title: 'Instagram DM Automation', url: 'https://www.youtube.com/embed/FvQ8bM_wWQw' },
              { title: 'Advanced Slack Workflows', url: 'https://www.youtube.com/embed/L18DSnVe5BE' },
              { title: 'Analytics & Optimization', url: 'https://www.youtube.com/embed/tYzMGcUty6s' },
            ].map((video, idx) => (
              <motion.div
                key={idx}
                className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <VideoEmbed url={video.url} title={video.title} />
                <div className="p-4">
                  <h3 className="font-bold">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Documentation */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-black mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Documentation
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Getting Started', desc: 'Learn the basics and set up your first automation' },
              { title: 'API Reference', desc: 'Complete documentation for our REST API' },
              { title: 'Platform Integrations', desc: 'Deep dive into each platform integration' },
              { title: 'Troubleshooting', desc: 'Solutions to common issues and problems' },
            ].map((doc, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="p-8 bg-secondary/30 rounded-2xl border border-border hover:border-primary/50 group transition-all"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <BookOpen className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                <p className="text-muted-foreground mb-4">{doc.desc}</p>
                <span className="text-primary font-semibold">Read more →</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-black mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Blog
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'How to Save 20 Hours Per Week with Automation', date: 'Mar 15, 2025', category: 'Tips' },
              { title: 'The Rise of Customer Service Bots', date: 'Mar 12, 2025', category: 'Trends' },
              { title: 'Maximizing ROI with Multi-Platform Automation', date: 'Mar 10, 2025', category: 'Strategy' },
              { title: 'Lovin\'s. Learn how to automate your workflows and save time across all your platforms. Update: New Email Features Released', date: 'Mar 8, 2025', category: 'Updates' },
            ].map((post, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="p-8 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                  {post.category}
                </span>
                <h3 className="font-bold text-lg mb-4">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post.date}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-foreground text-background">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black mb-6">Ready to start building?</h2>
          <p className="text-xl text-background/80 mb-8">
            Everything you need to automate is just a click away
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-background text-foreground rounded-xl font-bold hover:bg-secondary transition-colors"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
