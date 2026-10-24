import { Request, Response } from 'express'
import crypto from 'crypto'
import prisma from '../../config/database'
import { connectTelegramSchema, type ConnectTelegramInput } from './telegram.schema'
import {
  validateTelegramToken,
  encryptCredentials,
  decryptCredentials,
  createWebhookSecret,
  configureTelegramWebhook,
  removeTelegramWebhook,
  sendTelegramMessage,
} from './telegram.service'
import type { TelegramUpdate } from './telegram.types'

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

    // Render supplies its actual public URL at runtime; local development uses an HTTPS tunnel.
    const publicApiUrl = (process.env.RENDER_EXTERNAL_URL || process.env.API_PUBLIC_URL)?.trim().replace(/\/$/, '')
    if (!publicApiUrl || !publicApiUrl.startsWith('https://')) {
      res.status(503).json({ message: 'Telegram setup requires API_PUBLIC_URL to be a public HTTPS URL' })
      return
    }

    // Validate token with Telegram API
    const botInfo = await validateTelegramToken(botToken)

    // Encrypt credentials
    const webhookSecret = createWebhookSecret()
    const encryptedCredentials = encryptCredentials({
      botToken,
      botUsername: botInfo.username,
      webhookSecret,
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

    const connection = existingConnection
      ? await prisma.botConnection.update({
        where: { id: existingConnection.id },
        data: {
          credentials: encryptedCredentials,
          status: 'PENDING_TOKEN',
          botpressBotId: null,
        },
      })
      : await prisma.botConnection.create({
          data: {
            userId,
            platform: 'TELEGRAM',
            status: 'PENDING_TOKEN',
            credentials: encryptedCredentials,
          },
        })

    try {
      await configureTelegramWebhook(botToken, `${publicApiUrl}/api/webhooks/telegram/${connection.id}`, webhookSecret)
    } catch (webhookError) {
      await prisma.botConnection.update({ where: { id: connection.id }, data: { status: 'ERROR' } })
      console.error('Configure Telegram webhook error:', webhookError)
      res.status(502).json({ message: 'Telegram token is valid, but webhook setup failed. Please try again.' })
      return
    }

    const activeConnection = await prisma.botConnection.update({
      where: { id: connection.id },
      data: { status: 'ACTIVE' },
    })

    res.status(existingConnection ? 200 : 201).json({
      message: 'Telegram bot connected successfully',
      connection: {
        id: activeConnection.id,
        platform: activeConnection.platform,
        status: activeConnection.status,
        credentials: {
          botUsername: botInfo.username,
        },
        createdAt: activeConnection.createdAt,
        updatedAt: activeConnection.updatedAt,
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

    if (connection.platform === 'TELEGRAM') {
      try {
        const credentials = decryptCredentials(connection.credentials as string)
        await removeTelegramWebhook(credentials.botToken)
      } catch (error) {
        console.error('Remove Telegram webhook error:', error)
        res.status(502).json({ message: 'Could not remove Telegram webhook. The bot remains connected.' })
        return
      }
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

export async function receiveTelegramUpdate(req: Request, res: Response): Promise<void> {
  const connectionId = req.params.id as string
  const update = req.body as TelegramUpdate

  if (!Number.isInteger(update?.update_id) || !update.message?.chat?.id) {
    res.status(200).json({ ok: true })
    return
  }

  try {
    const connection = await prisma.botConnection.findFirst({
      where: { id: connectionId, platform: 'TELEGRAM', status: 'ACTIVE' },
    })

    if (!connection) {
      res.status(404).json({ message: 'Telegram connection not found' })
      return
    }

    const credentials = decryptCredentials(connection.credentials as string)
    const suppliedSecret = req.header('x-telegram-bot-api-secret-token') || ''
    const expectedSecret = credentials.webhookSecret || ''
    const supplied = Buffer.from(suppliedSecret)
    const expected = Buffer.from(expectedSecret)
    if (!expected.length || supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
      res.status(401).json({ message: 'Invalid Telegram webhook secret' })
      return
    }

    const text = update.message.text?.trim() || ''
    const noteMatch = text.match(/^(?:\/note(?:@\w+)?\s+|note:\s*)(.+)$/is)
    let reply: string
    if (noteMatch?.[1]?.trim()) {
      reply = 'Saved that note.'
    } else {
      reply = 'Hi! Send /note followed by text to save a note. Example: /note Call Ada tomorrow.'
    }

    try {
      await prisma.$transaction(async (tx) => {
        await tx.telegramUpdate.create({
          data: { botConnectionId: connection.id, updateId: update.update_id },
        })
        if (noteMatch?.[1]?.trim()) {
          await tx.note.create({
            data: { botConnectionId: connection.id, content: noteMatch[1].trim() },
          })
        }
      })
    } catch (error) {
      // Telegram retries updates when delivery fails. Keep note creation idempotent,
      // but still retry the reply below for an already-recorded update.
      if ((error as { code?: string }).code !== 'P2002') throw error
    }

    await sendTelegramMessage(credentials.botToken, update.message.chat.id, reply)
    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Telegram update error:', error)
    res.status(500).json({ message: 'Failed to process Telegram update' })
  }
}
