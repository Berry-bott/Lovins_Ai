'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, fadeInUp, itemVariants } from '@/lib/animations'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Plans</span>
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-6xl font-black mb-8"
            variants={fadeInUp}
          >
            Simple, transparent <span className="text-primary">pricing</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            Scale your automation as your business grows. Pay only for what you use.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              name: 'Starter',
              price: '$29',
              desc: 'Perfect for getting started',
              features: [
                'Up to 1,000 automations/month',
                '2 platforms',
                'Email support',
                'Basic analytics',
                '1 team member',
              ],
            },
            {
              name: 'Professional',
              price: '$99',
              desc: 'For growing businesses',
              features: [
                'Up to 50,000 automations/month',
                'All platforms',
                'Priority support',
                'Advanced analytics',
                'API access',
                '5 team members',
                'Custom integrations',
              ],
              highlighted: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              desc: 'For large-scale operations',
              features: [
                'Unlimited automations',
                'All platforms + custom',
                '24/7 dedicated support',
                'Custom analytics',
                'Unlimited team members',
                'SLA guarantee',
                'White-label options',
              ],
            },
          ].map((plan, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-2xl border-2 transition-all ${
                plan.highlighted
                  ? 'border-primary bg-primary/5 scale-105 shadow-xl'
                  : 'border-border hover:border-primary/50'
              }`}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm">{plan.desc}</p>
              
              <div className="mb-8">
                <div className="text-5xl font-black text-primary">{plan.price}</div>
                {plan.price !== 'Custom' && <p className="text-muted-foreground">/month</p>}
              </div>

              <Link
                href="/auth/signup"
                className={`block w-full py-3 px-4 rounded-xl font-bold text-center transition-all mb-8 ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-secondary hover:bg-muted'
                }`}
              >
                Get Started
              </Link>

              <ul className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-4xl font-black text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { q: 'Can I change my plan anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'Do you offer a free trial?', a: 'Absolutely! You get 14 days free on any plan. No credit card required.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise plans.' },
              { q: 'Is there a setup fee?', a: 'No setup fees. You only pay for the plan you choose.' },
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel at any time with no penalties or long-term commitments.' },
              { q: 'Do you offer bulk discounts?', a: 'Yes, contact our sales team for custom pricing on enterprise plans.' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="p-6 bg-secondary/30 rounded-xl border border-border"
                variants={itemVariants}
              >
                <h3 className="font-bold mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
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
          <h2 className="text-4xl font-black mb-6">Start automating today</h2>
          <p className="text-xl text-background/80 mb-8">
            14 days free. No credit card required.
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
