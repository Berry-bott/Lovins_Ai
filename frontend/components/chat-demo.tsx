'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

const MESSAGES = [
  { type: 'user', text: 'Hello! 👋', delay: 0.5 },
  { type: 'bot', text: 'Hi there! Welcome to Lovin\'s 🎉 How can I help you today?', delay: 1.2 },
  { type: 'user', text: 'What products do you offer?', delay: 1.8 },
  {
    type: 'bot',
    text: 'Great question! We have 3 amazing plans:',
    products: [
      { name: 'Starter', price: '$29/month' },
      { name: 'Professional', price: '$99/month' },
      { name: 'Enterprise', price: 'Custom' },
    ],
    delay: 2.6,
  },
  { type: 'user', text: 'Whats included in Professional?', delay: 3.4 },
  {
    type: 'bot',
    text: 'Professional plan includes:',
    features: ['✓ 50K+ messages/month', '✓ Unlimited automations', '✓ Priority support', '✓ Advanced analytics', '✓ API access'],
    delay: 4.2,
  },
  { type: 'user', text: 'Perfect! How do I get started?', delay: 5.0 },
  { type: 'bot', text: 'Awesome! I can set you up right now. Would you like to proceed with the Professional plan?', delay: 5.8 },
  { type: 'user', text: 'Yes, lets do it! 🚀', delay: 6.4 },
  { type: 'bot', text: 'Excellent! Processing your subscription... You\'re all set! 🎉 Payment confirmed. Your Professional plan is now active.', delay: 7.2 },
  { type: 'user', text: 'Thank you! This is amazing!', delay: 7.9 },
  { type: 'bot', text: 'You\'re welcome! Check your email for setup details. Our team will reach out shortly. Happy automating! 😊', delay: 8.7 },
]

export function ChatDemo() {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [cycleCount, setCycleCount] = useState(0)
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(0)

  // Cycle through messages progressively
  useEffect(() => {
    const timings = [0.8, 2.0, 3.2, 4.6, 6.0, 7.4, 8.8, 10.2, 11.6, 13.0, 14.4, 15.8]
    
    const messageTimers = timings.map((delay, idx) => {
      return setTimeout(() => {
        setVisibleMessagesCount(idx + 1)
        // Auto-scroll as each message appears
        if (messagesContainerRef.current) {
          setTimeout(() => {
            messagesContainerRef.current?.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth',
            })
          }, 300)
        }
      }, delay * 1000)
    })

    // Reset after conversation ends (3 sec pause + full cycle)
    const resetTimer = setTimeout(() => {
      setVisibleMessagesCount(0)
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0
      }
      setCycleCount((prev) => prev + 1)
    }, 19000) // 15.8s (last message) + 3.2s (pause)

    return () => {
      messageTimers.forEach((timer) => clearTimeout(timer))
      clearTimeout(resetTimer)
    }
  }, [cycleCount])

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1">
      <div className="rounded-2xl overflow-hidden bg-background">
        {/* Chat Container */}
        <div className="aspect-video w-full bg-secondary/50 flex flex-col relative group">
          {/* Header */}
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Lovin's AI Bot</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>

          {/* Messages Container - Hidden Scrollbar */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto py-4 px-6 space-y-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {MESSAGES.map((message, idx) => {
              if (idx >= visibleMessagesCount) return null
              return (
              <motion.div
                key={`${cycleCount}-${idx}`}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-xs text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-secondary rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>

                  {message.products && (
                    <div className="space-y-2 mt-2">
                      {message.products.map((product, pidx) => (
                        <motion.div
                          key={pidx}
                          className="border border-border rounded p-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: message.delay + 0.2 + pidx * 0.1 }}
                        >
                          <p className="font-semibold text-xs">{product.name}</p>
                          <p className={message.type === 'user' ? '' : 'text-muted-foreground text-xs'}>
                            {product.price}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {message.features && (
                    <ul className="text-xs mt-2 space-y-1">
                      {message.features.map((feature, fidx) => (
                        <motion.li
                          key={fidx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: message.delay + 0.2 + fidx * 0.1 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
              )
            })}
          </div>

          {/* Input */}
          <div className="border-t border-border px-6 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none"
                disabled
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-2xl -z-10 opacity-50" />
    </div>
  )
}
