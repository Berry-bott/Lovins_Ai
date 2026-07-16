// import express from 'express'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import helmet from 'helmet'
// import rateLimit from 'express-rate-limit'
// import dotenv from 'dotenv'
// import routes from './routes'

// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 4000
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// // Security headers
// app.use(helmet())

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { message: 'Too many requests, please try again later' },
// })
// app.use('/api/auth', limiter)

// // CORS
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }))

// // Body parsing
// app.use(express.json({ limit: '10kb' })) // limit body size
// app.use(cookieParser())

// // Routes
// app.use('/api', routes)

// // Health check
// app.get('/health', (_req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() })
// })

// // 404 handler
// app.use((_req, res) => {
//   res.status(404).json({ message: 'Route not found' })
// })

// // Global error handler
// app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   console.error('Unhandled error:', err)
//   res.status(500).json({ message: 'Internal server error' })
// })

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
//   console.log(`API available at http://localhost:${PORT}/api`)
//   console.log(`Accepting requests from: ${FRONTEND_URL}`)
// })

// export default app



import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Support one or multiple comma-separated origins via env var
// e.g. FRONTEND_URLS=http://localhost:3000,https://lovins-ai.vercel.app
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, '')) // trim + strip trailing slash

// Security headers
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later' },
})
app.use('/api/auth', limiter)

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (curl, mobile apps, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Body parsing
app.use(express.json({ limit: '10kb' })) // limit body size
app.use(cookieParser())

// Routes
app.use('/api', routes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)

  // CORS errors thrown by the origin callback above land here
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({ message: 'Not allowed by CORS' })
  }

  res.status(500).json({ message: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
  console.log(`Accepting requests from: ${allowedOrigins.join(', ')}`)
})

export default app