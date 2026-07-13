'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { ArrowRight, MessageCircle, Mail, Heart, Zap, BarChart3, Lock, Smartphone, Send, User, Calendar, Rocket, Hash, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, containerVariants, itemVariants } from '@/lib/animations'
import { ChatDemo } from '@/components/chat-demo'

const PLATFORMS = [
  { name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { name: 'Email', icon: Mail, color: '#EA4335' },
  { name: 'Instagram', icon: Heart, color: '#E4405F' },
  { name: 'Slack', icon: Send, color: '#36C5F0' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
         <Header />

      {/* Hero Section */}
      <section className="relative px-[9px] sm:px-6 lg:px-8 py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" variants={containerVariants} initial="hidden" animate="visible">
            {/* Left Content */}
            <motion.div>
              <motion.div variants={fadeInUp} >
                <span className="text-xs pl-5 md:pl-2 font-semibold text-primary uppercase tracking-wide">Automate Everywhere</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl max-md:text-center  sm:text-6xl lg:text-7xl font-black text-balance mb-6"
                variants={fadeInUp}
              >
                Build bots for <span className="text-primary">every platform</span>
              </motion.h1>

              <motion.p 
                className="md:text-xl max-md:text-center text-lg text-muted-foreground text-balance mb-12"
                variants={fadeInUp}
              >
                Create intelligent automation across WhatsApp, Email, Instagram, Slack and more. One platform to automate them all.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-4 ">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Creating <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary transition-colors"
                >
                  Watch Demo
                </Link>
              </motion.div>

              {/* Platform Icons */}
              <motion.div className="flex flex-wrap gap-4 items-center" variants={itemVariants}>
                <span className="text-sm text-muted-foreground font-semibold">Supported platforms:</span>
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <motion.div 
                      key={platform.name}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon className="w-4 h-4" />
                      {platform.name}
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Right Chat Demo */}
            <motion.div
              variants={fadeInUp}
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ChatDemo />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Choose Your Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build automations for the platforms your customers are already using
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: 'WhatsApp',
                description: 'Auto-replies, lead qualification, and support on WhatsApp.',
                features: ['Auto-replies', 'Lead qualification', 'Order updates', 'Support tickets'],
                icon: MessageCircle,
              },
              {
                name: 'Email',
                description: 'Intelligent email automation and drip campaigns.',
                features: ['Welcome series', 'Abandoned cart', 'Re-engagement', 'Newsletters'],
                icon: Mail,
              },
              {
                name: 'Instagram',
                description: 'Manage DMs, engage followers, capture leads.',
                features: ['DM responses', 'Comment replies', 'Story interactions', 'Lead capture'],
                icon: Heart,
              },
              {
                name: 'Slack',
                description: 'Streamline team workflows with Slack bots.',
                features: ['Notifications', 'Reminders', 'Data summaries', 'Task automation'],
                icon: Send,
              },
              {
                name: 'Telegram',
                description: 'Automated channels, groups, and customer chats.',
                features: ['Auto-replies', 'Broadcast messages', 'Group moderation', 'Bots & commands'],
                icon: Rocket,
              },
              {
                name: 'SMS',
                description: 'Two-way text automation for reminders and support.',
                features: ['Appointment reminders', 'Order updates', 'Two-way replies', 'Bulk campaigns'],
                icon: Smartphone,
              },
              {
                name: 'Discord',
                description: 'Community management and support automation.',
                features: ['Auto-moderation', 'Welcome messages', 'Role assignment', 'Support tickets'],
                icon: Hash,
              },
              {
                name: 'Messenger',
                description: 'Automate Facebook Page conversations at scale.',
                features: ['Auto-replies', 'Lead capture', 'Order tracking', 'Broadcasts'],
                icon: MessageSquare,
              },
            ].map((platform, idx) => {
              const Icon = platform.icon
              return (
                <motion.div
                  key={idx}
                  className="p-4 bg-background  rounded-2xl border border-border hover:border-primary/50 transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold">{platform.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
                  <ul className="space-y-1.5">
                    {platform.features.map((feature, fidx) => (
                      <li key={fidx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Why Choose Lovin's</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'No Code Required', description: 'Build complex automations without any programming knowledge.' },
              { title: 'AI-Powered', description: 'Intelligent responses that learn from interactions.' },
              { title: 'Unlimited Automations', description: 'Create as many bots as you need for different platforms.' },
              { title: 'Real-Time Analytics', description: 'Track performance and optimize your automations instantly.' },
              { title: 'Enterprise Security', description: 'Bank-level encryption and compliance standards.' },
              { title: '24/7 Support', description: 'Expert support team ready to help you succeed.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 text-center"
                variants={itemVariants}
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Scale at your own pace</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Starter', price: '$29', limit: 'Up to 1,000 automations/month' },
              { name: 'Professional', price: '$99', limit: 'Up to 50,000 automations/month', highlighted: true },
              { name: 'Enterprise', price: 'Custom', limit: 'Unlimited everything' },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  plan.highlighted
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-primary mb-4">{plan.price}</div>
                <p className="text-muted-foreground mb-6">{plan.limit}</p>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-secondary hover:bg-muted'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-background">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-16">
            <div>
              <motion.h2 
                className="text-4xl sm:text-5xl font-black mb-4"
                variants={fadeInUp}
              >
                Latest from our blog
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground"
                variants={fadeInUp}
              >
                Tips, strategies, and insights on automation and AI
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                View All Articles <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'How AI-Powered Lovin\'s Are Revolutionizing Customer Service',
                category: 'AI & Automation',
                author: 'Sarah Johnson',
                date: 'Dec 15, 2024',
                readTime: '8 min read',
                image: '/blog-1.png',
              },
              {
                title: 'WhatsApp Business Integration: The Complete Guide',
                category: 'Integration',
                author: 'Mike Chen',
                date: 'Dec 12, 2024',
                readTime: '6 min read',
                image: '/blog-2.png',
              },
              {
                title: '5 Automation Strategies That Increased Sales by 300%',
                category: 'Case Study',
                author: 'Emma Davis',
                date: 'Dec 10, 2024',
                readTime: '10 min read',
                image: '/blog-3.png',
              },
            ].map((article, idx) => (
              <motion.article
                key={idx}
                className="group bg-card rounded-2xl border border-border hover:border-primary/50 transition-all overflow-hidden cursor-pointer flex flex-col h-full"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                      {article.category}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-foreground text-background">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-black mb-6"
            variants={fadeInUp}
          >
            Ready to automate?
          </motion.h2>
          <motion.p 
            className="text-xl text-background/80 mb-8"
            variants={fadeInUp}
          >
            Join thousands of businesses automating their platforms with Lovin's
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-xl font-bold hover:bg-secondary transition-colors"
            >
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-secondary/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platforms</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {PLATFORMS.map((p) => (
                  <li key={p.name}>{p.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-2 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Lovin's. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
