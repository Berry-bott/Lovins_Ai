
  'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { BlogImage } from '@/components/blog-image'
import { Calendar, User, ArrowRight, Search, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, fadeInUp, itemVariants } from '@/lib/animations'
import { useState } from 'react'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'How AI-Powered Chatbots Are Revolutionizing Customer Service',
    excerpt: 'Discover how intelligent automation is transforming the way businesses interact with their customers across multiple channels.',
    category: 'AI & Automation',
    author: 'Sarah Johnson',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    image: '/blog-1.png',
    featured: true,
    views: '12.5K',
  },
  {
    id: 2,
    title: 'WhatsApp Business Integration: The Complete Guide',
    excerpt: 'Learn how to seamlessly integrate WhatsApp Business with your automation platform for maximum customer engagement.',
    category: 'Integration',
    author: 'Mike Chen',
    date: 'Dec 12, 2024',
    readTime: '6 min',
    image: '/blog-2.png',
    featured: true,
    views: '8.2K',
  },
  {
    id: 3,
    title: '5 Automation Strategies That Increased Sales by 300%',
    excerpt: 'Real-world case studies showing how businesses used Lovin\'s to dramatically improve their conversion rates.',
    category: 'Case Study',
    author: 'Emma Davis',
    date: 'Dec 10, 2024',
    readTime: '10 min',
    image: '/blog-3.png',
    featured: true,
    views: '15.8K',
  },
  {
    id: 4,
    title: 'The Future of Multi-Platform Messaging',
    excerpt: 'Exploring the evolution of customer communication and how businesses can stay ahead of the curve.',
    category: 'Trends',
    author: 'James Wilson',
    date: 'Dec 8, 2024',
    readTime: '7 min',
    image: '/blog-4.png',
    views: '5.3K',
  },
  {
    id: 5,
    title: 'Email Automation Best Practices in 2024',
    excerpt: 'Master the art of email automation with our comprehensive guide to compliance, personalization, and engagement.',
    category: 'Email Marketing',
    author: 'Lisa Anderson',
    date: 'Dec 5, 2024',
    readTime: '9 min',
    image: '/blog-5.png',
    views: '9.1K',
  },
  {
    id: 6,
    title: 'Building Your First Automated Workflow',
    excerpt: 'A step-by-step tutorial for beginners looking to create their first automation workflow with Lovin\'s.',
    category: 'Tutorial',
    author: 'Alex Rodriguez',
    date: 'Dec 1, 2024',
    readTime: '5 min',
    image: '/blog-6.png',
    views: '7.4K',
  },
  {
    id: 7,
    title: 'Security & Privacy: Protecting Your Customer Data',
    excerpt: 'Understanding the importance of data security in automation platforms and how Lovin\'s keeps your data safe.',
    category: 'Security',
    author: 'Rachel Moore',
    date: 'Nov 28, 2024',
    readTime: '8 min',
    image: '/blog-7.png',
    views: '6.9K',
  },
  {
    id: 8,
    title: 'Analytics & Insights: Understanding Your Bot Performance',
    excerpt: 'Deep dive into Lovin\'s analytics to measure, analyze, and optimize your automation performance.',
    category: 'Analytics',
    author: 'David Park',
    date: 'Nov 25, 2024',
    readTime: '7 min',
    image: '/blog-8.png',
    views: '5.6K',
  },
]

const CATEGORIES = ['All', 'AI & Automation', 'Integration', 'Case Study', 'Trends', 'Email Marketing', 'Tutorial', 'Security', 'Analytics']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const featuredPosts = BLOG_POSTS.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background ">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Stories & Insights</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            variants={fadeInUp}
          >
            The Blog
          </motion.h1>

          <motion.p 
            className="text-xl text-muted-foreground mb-12  max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            Insights on automation, AI, and the future of customer engagement. Read stories from industry leaders and Lovin's experts.
          </motion.p>

          {/* Search and Filter */}
          <motion.div variants={fadeInUp} className="space-y-15 ">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full ">
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Large Featured */}
              {/* Large Featured */}
              <motion.article
                variants={fadeInUp}
                className="group lg:col-span-2 cursor-pointer"
              >
                <div className="relative w-full h-[60vh] min-h-[420px] max-h-[600px] rounded-3xl overflow-hidden bg-secondary">
                  <BlogImage
                    src={featuredPosts[0]?.image}
                    alt={featuredPosts[0]?.title ?? ''}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 lg:p-12">
                    <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                      Featured
                    </div>
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{featuredPosts[0]?.category}</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-white max-w-3xl leading-tight group-hover:text-primary transition-colors">
                      {featuredPosts[0]?.title}
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl leading-relaxed hidden sm:block">
                      {featuredPosts[0]?.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-white/70" />
                        <span className="text-sm text-white/70">{featuredPosts[0]?.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/70" />
                        <span className="text-sm text-white/70">{featuredPosts[0]?.date}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{featuredPosts[0]?.readTime} read</span>
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Side Featured */}
              {featuredPosts.slice(1, 3).map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary mb-6">
                    <BlogImage
                      src={post.image}
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-2xl font-bold mt-3 mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-muted-foreground">No articles found. Try a different search or category.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary mb-6">
                    <BlogImage
                      src={post.image}
                      alt={post.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                        {post.views}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                      <TrendingUp className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary">{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-black mb-4"
            variants={fadeInUp}
          >
            Get the latest insights
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            variants={fadeInUp}
          >
            Subscribe to our newsletter and never miss out on automation tips, industry trends, and success stories.
          </motion.p>

          <motion.form 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        </motion.div>
      </section>
    </div>
  )
}