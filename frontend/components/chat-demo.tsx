// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion } from 'framer-motion'
// import { MessageCircle, Send } from 'lucide-react'

// const MESSAGES = [
//   { type: 'user', text: 'Hello! 👋', delay: 0.5 },
//   { type: 'bot', text: 'Hi there! Welcome to Lovin\'s 🎉 How can I help you today?', delay: 1.2 },
//   { type: 'user', text: 'What products do you offer?', delay: 1.8 },
//   {
//     type: 'bot',
//     text: 'Great question! We have 3 amazing plans:',
//     products: [
//       { name: 'Starter', price: '$29/month' },
//       { name: 'Professional', price: '$99/month' },
//       { name: 'Enterprise', price: 'Custom' },
//     ],
//     delay: 0.6,
//   },
//   { type: 'user', text: 'Whats included in Professional?', delay: 5.4 },
//   {
//     type: 'bot',
//     text: 'Professional plan includes:',
//     features: ['✓ 50K+ messages/month', '✓ Unlimited automations', '✓ Priority support', '✓ Advanced analytics', '✓ API access'],
//     delay: 1.0,
//   },
//   { type: 'user', text: 'Perfect! How do I get started?', delay: 8.0 },
//   { type: 'bot', text: 'Awesome! I can set you up right now. Would you like to proceed with the Professional plan?', delay: 5.8 },
//   { type: 'user', text: 'Yes, lets do it! 🚀', delay: 8.4 },
//   { type: 'bot', text: 'Excellent! Processing your subscription... You\'re all set! 🎉 Payment confirmed. Your Professional plan is now active.', delay: 8.2 },
//   { type: 'user', text: 'Thank you! This is amazing!', delay: 8.9 },
//   { type: 'bot', text: 'You\'re welcome! Check your email for setup details. Our team will reach out shortly. Happy automating! 😊', delay: 8.7 },
// ]

// export function ChatDemo() {
//   const messagesContainerRef = useRef<HTMLDivElement>(null)
//   const [cycleCount, setCycleCount] = useState(0)
//   const [visibleMessagesCount, setVisibleMessagesCount] = useState(0)

//   // Cycle through messages progressively
//   useEffect(() => {
//     const timings = [0.8, 2.0, 3.2, 4.6, 6.0, 7.4, 8.8, 10.2, 11.6, 13.0, 14.4, 15.8]
    
//     const messageTimers = timings.map((delay, idx) => {
//       return setTimeout(() => {
//         setVisibleMessagesCount(idx + 1)
//         // Auto-scroll as each message appears
//         if (messagesContainerRef.current) {
//           setTimeout(() => {
//             messagesContainerRef.current?.scrollTo({
//               top: messagesContainerRef.current.scrollHeight,
//               behavior: 'smooth',
//             })
//           }, 500)
//         }
//       }, delay * 1000)
//     })

//     // Reset after conversation ends (3 sec pause + full cycle)
//     const resetTimer = setTimeout(() => {
//       setVisibleMessagesCount(0)
//       if (messagesContainerRef.current) {
//         messagesContainerRef.current.scrollTop = 0
//       }
//       setCycleCount((prev) => prev + 1)
//     }, 19000) // 15.8s (last message) + 3.2s (pause)

//     return () => {
//       messageTimers.forEach((timer) => clearTimeout(timer))
//       clearTimeout(resetTimer)
//     }
//   }, [cycleCount])

//   return (
//     <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1">
//       <div className="rounded-2xl overflow-hidden bg-background">
//         {/* Chat Container */}
//         <div className="aspect-video w-full bg-secondary/50 flex flex-col relative group">
//           {/* Header */}
//           <div className="border-b border-border px-6 py-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
//                 <MessageCircle className="w-5 h-5 text-primary" />
//               </div>
//               <div>
//                 <p className="font-semibold text-sm">Lovin's AI Bot</p>
//                 <p className="text-xs text-muted-foreground">Online</p>
//               </div>
//             </div>
//           </div>

//           {/* Messages Container - Hidden Scrollbar */}
//           <div
//             ref={messagesContainerRef}
//             className="flex-1 overflow-y-auto py-16 md:py-4 px-6 space-y-4 scroll-smooth"
//             style={{
//               scrollbarWidth: 'none',
//               msOverflowStyle: 'none',
//             }}
//           >
//             <style>{`
//               div::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>

//             {MESSAGES.map((message, idx) => {
//               if (idx >= visibleMessagesCount) return null
//               return (
//               <motion.div
//                 key={`${cycleCount}-${idx}`}
//                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{
//                   duration: 0.6,
//                   ease: 'easeOut',
//                 }}
//               >
//                 <div
//                   className={`rounded-2xl px-4 py-2 max-w-xs text-sm ${
//                     message.type === 'user'
//                       ? 'bg-primary text-primary-foreground rounded-tr-none'
//                       : 'bg-secondary rounded-tl-none'
//                   }`}
//                 >
//                   <p>{message.text}</p>

//                   {message.products && (
//                     <div className="space-y-1 mt-1">
//                       {message.products.map((product, pidx) => (
//                         <motion.div
//                           key={pidx}
//                           className="border border-border rounded p-1"
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: message.delay + 0.5 + pidx * 0.1 }}
//                         >
//                           <p className="font-semibold text-xs">{product.name}</p>
//                           <p className={message.type === 'user' ? '' : 'text-muted-foreground text-xs'}>
//                             {product.price}
//                           </p>
//                         </motion.div>
//                       ))}
//                     </div>
//                   )}

//                   {message.features && (
//                     <ul className="text-xs mt- space-y-1">
//                       {message.features.map((feature, fidx) => (
//                         <motion.li
//                           key={fidx}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: message.delay + 0.2 + fidx * 0.1 }}
//                         >
//                           {feature}
//                         </motion.li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </motion.div>
//               )
//             })}
//           </div>

//           {/* Input */}
//           <div className="border-t border-border px-6 py-4">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none"
//                 disabled
//               />
//               <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
//                 <Send className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Decorative blur */}
//       <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-2xl -z-10 opacity-50" />
//     </div>
//   )
// }



'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

const MESSAGES = [
  { type: 'user', text: 'Hello! 👋', delay: 0.5 },
  { type: 'bot', text: 'Hi there! Welcome to Lovin\'s 🎉 How can I help you today?', delay: 2.0 },
  { type: 'user', text: 'What products do you offer?', delay: 2.5 },
  {
    type: 'bot',
    text: 'Great question! We have 3 amazing plans:',
    products: [
      { name: 'Starter', price: '$29/month' },
      { name: 'Professional', price: '$99/month' },
      { name: 'Enterprise', price: 'Custom' },
    ],
    delay: 2.2,
  },
  { type: 'user', text: 'Whats included in Professional?', delay: 2.8 },
  {
    type: 'bot',
    text: 'Professional plan includes:',
    features: ['✓ 50K+ messages/month', '✓ Unlimited automations', '✓ Priority support', '✓ Advanced analytics', '✓ API access'],
    delay: 2.3,
  },
  { type: 'user', text: 'Perfect! How do I get started?', delay: 2.6 },
  { type: 'bot', text: 'Awesome! I can set you up right now. Would you like to proceed with the Professional plan?', delay: 2.5 },
  { type: 'user', text: 'Yes, lets do it! 🚀', delay: 2.4 },
  { type: 'bot', text: 'Excellent! Processing your subscription... You\'re all set! 🎉 Payment confirmed. Your Professional plan is now active.', delay: 3.0 },
  { type: 'user', text: 'Thank you! This is amazing!', delay: 2.5 },
  { type: 'bot', text: 'You\'re welcome! Check your email for setup details. Our team will reach out shortly. Happy automating! 😊', delay: 3.0 },
]

// Calculate cumulative delays for each message
const calculateMessageTimings = () => {
  let currentTime = 0
  return MESSAGES.map((message) => {
    const messageDelay = currentTime
    currentTime += message.delay
    return messageDelay
  })
}

const MESSAGE_TIMINGS = calculateMessageTimings()
const TOTAL_CYCLE_TIME = MESSAGE_TIMINGS[MESSAGE_TIMINGS.length - 1] + 3.0 // 3s pause before reset

export function ChatDemo() {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [cycleCount, setCycleCount] = useState(0)
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(0)

  useEffect(() => {
    const messageTimers = MESSAGE_TIMINGS.map((delay, idx) => {
      return setTimeout(() => {
        setVisibleMessagesCount(idx + 1)
        // Smooth auto-scroll with slight delay
        if (messagesContainerRef.current) {
          setTimeout(() => {
            messagesContainerRef.current?.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth',
            })
          }, 100)
        }
      }, delay * 1000)
    })

    // Reset after conversation ends
    const resetTimer = setTimeout(() => {
      setVisibleMessagesCount(0)
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0
      }
      setCycleCount((prev) => prev + 1)
    }, TOTAL_CYCLE_TIME * 1000)

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
          <motion.div
            className="border-b border-border px-6 py-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <p className="font-semibold text-sm">Lovin's AI Bot</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </motion.div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto py-16 md:py-4 px-6 space-y-4 scroll-smooth"
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

            <AnimatePresence mode="popLayout">
              {MESSAGES.map((message, idx) => {
                if (idx >= visibleMessagesCount) return null

                const isUser = message.type === 'user'

                return (
                  <motion.div
                    key={`${cycleCount}-${idx}`}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, x: isUser ? 30 : -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: isUser ? 30 : -30, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <motion.div
                      className={`rounded-2xl px-4 py-3 max-w-xs text-sm shadow-sm ${
                        isUser
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-secondary rounded-tl-none'
                      }`}
                      initial={{ filter: 'blur(4px)' }}
                      animate={{ filter: 'blur(0px)' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {message.text}
                      </motion.p>

                      {message.products && (
                        <motion.div
                          className="space-y-2 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                        >
                          {message.products.map((product, pidx) => (
                            <motion.div
                              key={pidx}
                              className="border border-border rounded p-2 backdrop-blur-sm hover:bg-white/5 transition-colors"
                              initial={{ opacity: 0, y: 8, x: -10 }}
                              animate={{ opacity: 1, y: 0, x: 0 }}
                              transition={{
                                delay: 0.25 + pidx * 0.1,
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1],
                              }}
                            >
                              <p className="font-semibold text-xs">{product.name}</p>
                              <p className={isUser ? '' : 'text-muted-foreground text-xs'}>
                                {product.price}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {message.features && (
                        <motion.ul
                          className="text-xs mt-3 space-y-1.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          {message.features.map((feature, fidx) => (
                            <motion.li
                              key={fidx}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.3 + fidx * 0.08,
                                duration: 0.3,
                                ease: [0.34, 1.56, 0.64, 1],
                              }}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Input */}
          <motion.div
            className="border-t border-border px-6 py-4 bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm outline-none transition-all focus:border-primary/50"
                disabled
              />
              <motion.button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-2xl -z-10 opacity-50" />
    </div>
  )
} 