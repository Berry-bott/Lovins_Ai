import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import prisma from '../config/database'
import { generateToken } from '../utils/jwt'
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/auth.schema'
import { sendPasswordResetEmail } from '../utils/email'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
}

const PASSWORD_RESET_EXPIRY = 60 * 60 * 1000 // 1 hour

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validation = signupSchema.safeParse(req.body)
    if (!validation.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validation.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
      return
    }

    const { name, email, password } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existingUser) {
      res.status(409).json({ message: 'An account with this email already exists' })
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    // Generate JWT
    const token = generateToken({ userId: user.id, email: user.email })

    // Set HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS)

    // Return user (without password)
    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validation = loginSchema.safeParse(req.body)
    if (!validation.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validation.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
      return
    }

    const { email, password } = validation.data

    // Find user
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    // Generate JWT
    const token = generateToken({ userId: user.id, email: user.email })

    // Set HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS)

    // Return user (without password)
    res.status(200).json({
      message: 'Signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('token', { path: '/' })
  res.status(200).json({ message: 'Signed out successfully' })
}

export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validation = forgotPasswordSchema.safeParse(req.body)
    if (!validation.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validation.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
      return
    }

    const { email } = validation.data

    // Find user (don't reveal if email exists or not)
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

    // Always return success to prevent email enumeration
    if (!user) {
      res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' })
      return
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex')

    // Hash the token for storage
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

    // Store the hashed token
    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + PASSWORD_RESET_EXPIRY),
      },
    })

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`

    // Try to send email if SMTP is configured
    const smtpConfigured = process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD
    if (smtpConfigured) {
      try {
        await sendPasswordResetEmail(user.email, resetUrl)
        console.log(`Password reset email sent to ${email}`)
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError)
        // Don't fail the request — the token is still valid
      }
    } else {
      console.log(`Password reset URL for ${email}: ${resetUrl}`)
    }

    res.status(200).json({
      message: 'If an account with that email exists, a password reset link has been sent.',
      // In development, return the reset URL so the user can test
      ...(process.env.NODE_ENV !== 'production' && { resetUrl }),
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validation = resetPasswordSchema.safeParse(req.body)
    if (!validation.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validation.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
      return
    }

    const { token: rawToken, password } = validation.data

    // Hash the provided token to match what's stored in DB
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    // Find the reset token
    const resetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    })

    // Check if token exists and is not expired
    if (!resetTokenRecord) {
      res.status(400).json({ message: 'Invalid or expired reset token' })
      return
    }

    // Check if token has been used
    if (resetTokenRecord.usedAt) {
      res.status(400).json({ message: 'This reset link has already been used' })
      return
    }

    // Check if token is expired
    if (new Date() > resetTokenRecord.expiresAt) {
      res.status(400).json({ message: 'Reset token has expired' })
      return
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user password
    await prisma.user.update({
      where: { id: resetTokenRecord.userId },
      data: { password: hashedPassword },
    })

    // Mark the token as used
    await prisma.passwordResetToken.update({
      where: { id: resetTokenRecord.id },
      data: { usedAt: new Date() },
    })

    // Clear any existing sessions
    res.clearCookie('token', { path: '/' })

    res.status(200).json({ message: 'Password has been reset successfully. You can now sign in with your new password.' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}