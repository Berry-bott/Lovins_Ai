import { Request, Response, NextFunction } from 'express'
import { verifyToken, JwtPayload } from '../utils/jwt'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    // Check cookie first (HTTP-only), then Authorization header as fallback
    const tokenFromCookie = req.cookies?.token
    const tokenFromHeader = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : undefined

    const token = tokenFromCookie || tokenFromHeader

    if (!token) {
      res.status(401).json({ message: 'Authentication required' })
      return
    }

    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}