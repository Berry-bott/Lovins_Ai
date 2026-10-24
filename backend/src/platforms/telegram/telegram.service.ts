import axios from 'axios'
import crypto from 'crypto'
import { TelegramCredentials, TelegramBotInfo } from './telegram.types'
import { encrypt, decrypt } from '../../utils/crypto'

const TELEGRAM_API_URL = 'https://api.telegram.org'

export async function validateTelegramToken(token: string): Promise<TelegramBotInfo> {
  try {
    const response = await axios.get(`${TELEGRAM_API_URL}/bot${token}/getMe`, {
      timeout: 10000,
    })

    if (!response.data.ok) {
      throw new Error(response.data.description || 'Invalid bot token')
    }

    return response.data.result as TelegramBotInfo
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid bot token')
      }
      const message = error.response?.data?.description || 'Failed to validate bot token'
      throw new Error(message)
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to validate bot token')
  }
}

export function createWebhookSecret(): string {
  // Telegram allows URL-safe letters, numbers, underscores, and hyphens.
  return crypto.randomBytes(32).toString('base64url')
}

export async function configureTelegramWebhook(
  token: string,
  webhookUrl: string,
  secret: string
): Promise<void> {
  const response = await axios.post(`${TELEGRAM_API_URL}/bot${token}/setWebhook`, {
    url: webhookUrl,
    secret_token: secret,
    allowed_updates: ['message'],
  }, { timeout: 10000 })

  if (!response.data.ok) {
    throw new Error(response.data.description || 'Failed to configure Telegram webhook')
  }
}

export async function removeTelegramWebhook(token: string): Promise<void> {
  const response = await axios.post(`${TELEGRAM_API_URL}/bot${token}/deleteWebhook`, {}, { timeout: 10000 })
  if (!response.data.ok) {
    throw new Error(response.data.description || 'Failed to remove Telegram webhook')
  }
}

export async function sendTelegramMessage(token: string, chatId: number, text: string): Promise<void> {
  const response = await axios.post(`${TELEGRAM_API_URL}/bot${token}/sendMessage`, {
    chat_id: chatId,
    text,
  }, { timeout: 10000 })

  if (!response.data.ok) {
    throw new Error(response.data.description || 'Failed to send Telegram message')
  }
}

export function encryptCredentials(credentials: TelegramCredentials): string {
  return encrypt(JSON.stringify(credentials))
}

export function decryptCredentials(encryptedCredentials: string): TelegramCredentials {
  const decrypted = decrypt(encryptedCredentials)
  return JSON.parse(decrypted)
}

export function formatBotConnection(
  botInfo: TelegramBotInfo,
  encryptedCredentials: string,
  status: 'PENDING_TOKEN' | 'ACTIVE' | 'ERROR' | 'DISCONNECTED' = 'ACTIVE'
) {
  return {
    credentials: encryptedCredentials,
    status,
    botpressBotId: null,
  }
}
