'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { motion } from 'framer-motion'
import { containerVariants, fadeInUp, itemVariants } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 ">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Our Story</span>
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-6xl font-black mb-8"
            variants={fadeInUp}
          >
            We're building the <span className="text-primary">future of automation</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            Lovin's started because we realized most businesses waste countless hours on repetitive tasks. We built a platform that lets anyone automate any platform, no coding required.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <motion.div 
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-black mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To make professional automation accessible to every business, regardless of size or technical expertise. We believe everyone deserves tools that work as hard as they do, so they can focus on growth instead of repetitive tasks.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-black mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A world where automation is the default. Where businesses of all sizes can compete on equal footing through intelligent automation across every platform they use daily.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-black text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Simplicity First', desc: 'We make complex things simple. If it requires a manual, we redesign it.' },
              { title: 'User Obsessed', desc: 'Every feature exists because users asked for it. We listen and iterate constantly.' },
              { title: 'Always Learning', desc: 'We stay ahead of industry changes and invest in continuous improvement.' },
            ].map((val, idx) => (
              <motion.div key={idx} className="p-8 bg-secondary/30 rounded-2xl" variants={itemVariants}>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-muted-foreground">{val.desc}</p>
              </motion.div>
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
          <h2 className="text-4xl font-black mb-6">Join us on this journey</h2>
          <p className="text-xl text-background/80 mb-8">
            Be part of the automation revolution
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-background text-foreground rounded-xl font-bold hover:bg-secondary transition-colors"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
