'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, fadeInUp, itemVariants } from '@/lib/animations'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'E-commerce Owner',
    text: 'Lovin\'s cut our customer response time by 80%. We automated our entire WhatsApp support flow and now we reply instantly.',
    rating: 5,
    company: 'ShopHub',
  },
  {
    name: 'Marcus Chen',
    role: 'Marketing Director',
    text: 'The Email automation sequences are incredible. Our open rates increased 45% and we built everything without a single line of code.',
    rating: 5,
    company: 'GrowthLabs',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Social Media Manager',
    text: 'Instagram DM automation changed everything for us. We handle 10x more inquiries with the same team. Absolutely game-changing.',
    rating: 5,
    company: 'Brandify',
  },
  {
    name: 'James Wilson',
    role: 'Founder',
    text: 'I tried 3 other automation tools. Lovin\'s is the only one that actually works seamlessly across multiple platforms.',
    rating: 5,
    company: 'TechStart',
  },
  {
    name: 'Lisa Park',
    role: 'Operations Manager',
    text: 'Our team productivity skyrocketed. The Slack integration alone saves us 10 hours per week on routine tasks.',
    rating: 5,
    company: 'Digital Agency',
  },
  {
    name: 'David Thompson',
    role: 'Business Owner',
    text: 'Best investment we made. Lovin\'s paid for itself in the first month through the time we saved.',
    rating: 5,
    company: 'ConsultPro',
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Success Stories</span>
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-6xl font-black mb-8"
            variants={fadeInUp}
          >
            Trusted by <span className="text-primary">thousands</span> of businesses
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            See how real businesses are using Lovin's to automate their workflows
          </motion.p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-secondary/30 rounded-2xl border border-border hover:border-primary/50 transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed">{testimonial.text}</p>
              <div className="border-t border-border pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-secondary/30">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '2M+', label: 'Automations Run Daily' },
            { number: '98%', label: 'Customer Satisfaction' },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <motion.p 
                className="text-5xl font-black text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
              >
                {stat.number}
              </motion.p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black mb-6">Join the community</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Become part of a growing community of successful automation users
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Start Your Free Trial
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
