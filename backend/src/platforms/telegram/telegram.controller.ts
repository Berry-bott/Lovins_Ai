import { Request, Response } from 'express'
import prisma from '../../config/database'
import { authenticate } from '../../middleware/auth.middleware'
import { connectTelegramSchema, type ConnectTelegramInput } from './telegram.schema'
import { validateTelegramToken, encryptCredentials, decryptCredentials } from './telegram.service'

export async function connectTelegram(req: Request, res: Response): Promise<void> {
  try {
    const validation = connectTelegramSchema.safeParse(req.body)
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

    const { botToken } = validation.data as ConnectTelegramInput
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    // Validate token with Telegram API
    const botInfo = await validateTelegramToken(botToken)

    // Encrypt credentials
    const encryptedCredentials = encryptCredentials({
      botToken,
      botUsername: botInfo.username,
    })

    // Check if connection already exists
    const existingConnection = await prisma.botConnection.findUnique({
      where: {
        userId_platform: {
          userId,
          platform: 'TELEGRAM',
        },
      },
    })

    if (existingConnection) {
      // Update existing connection
      const updated = await prisma.botConnection.update({
        where: { id: existingConnection.id },
        data: {
          credentials: encryptedCredentials,
          status: 'ACTIVE',
          botpressBotId: null,
        },
      })

      res.status(200).json({
        message: 'Telegram bot connected successfully',
        connection: {
          id: updated.id,
          platform: updated.platform,
          status: updated.status,
          credentials: {
            botUsername: botInfo.username,
          },
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        },
      })
      return
    }

    // Create new connection
    const connection = await prisma.botConnection.create({
      data: {
        userId,
        platform: 'TELEGRAM',
        status: 'ACTIVE',
        credentials: encryptedCredentials,
      },
    })

    res.status(201).json({
      message: 'Telegram bot connected successfully',
      connection: {
        id: connection.id,
        platform: connection.platform,
        status: connection.status,
        credentials: {
          botUsername: botInfo.username,
        },
        createdAt: connection.createdAt,
        updatedAt: connection.updatedAt,
      },
    })
  } catch (error) {
    console.error('Connect Telegram error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function listConnections(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const connections = await prisma.botConnection.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    const formattedConnections = connections.map(conn => {
      if (conn.platform === 'TELEGRAM') {
        try {
          const decrypted = decryptCredentials(conn.credentials as string)
          return {
            id: conn.id,
            platform: conn.platform,
            status: conn.status,
            credentials: {
              botUsername: decrypted.botUsername,
            },
            createdAt: conn.createdAt,
            updatedAt: conn.updatedAt,
          }
        } catch (error) {
          console.error('Failed to decrypt credentials:', error)
          return {
            id: conn.id,
            platform: conn.platform,
            status: conn.status,
            credentials: {},
            createdAt: conn.createdAt,
            updatedAt: conn.updatedAt,
          }
        }
      }
      return {
        id: conn.id,
        platform: conn.platform,
        status: conn.status,
        credentials: {},
        createdAt: conn.createdAt,
        updatedAt: conn.updatedAt,
      }
    })

    res.status(200).json({ connections: formattedConnections })
  } catch (error) {
    console.error('List connections error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getConnection(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId
    const id = req.params.id as string

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const connection = await prisma.botConnection.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!connection) {
      res.status(404).json({ message: 'Connection not found' })
      return
    }

    let credentials = {}
    if (connection.platform === 'TELEGRAM') {
      try {
        const decrypted = decryptCredentials(connection.credentials as string)
        credentials = {
          botUsername: decrypted.botUsername,
        }
      } catch (error) {
        console.error('Failed to decrypt credentials:', error)
      }
    }

    res.status(200).json({
      connection: {
        id: connection.id,
        platform: connection.platform,
        status: connection.status,
        credentials,
        createdAt: connection.createdAt,
        updatedAt: connection.updatedAt,
      },
    })
  } catch (error) {
    console.error('Get connection error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function disconnectBot(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId
    const id = req.params.id as string

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const connection = await prisma.botConnection.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!connection) {
      res.status(404).json({ message: 'Connection not found' })
      return
    }

    await prisma.botConnection.update({
      where: { id: connection.id },
      data: {
        status: 'DISCONNECTED',
      },
    })

    res.status(200).json({ message: 'Bot disconnected successfully' })
  } catch (error) {
    console.error('Disconnect bot error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

function extractBotUsername(credentials: unknown): string | undefined {
  try {
    const creds = typeof credentials === 'string' ? JSON.parse(credentials) : credentials
    return creds?.botUsername
  } catch {
    return undefined
  }
}