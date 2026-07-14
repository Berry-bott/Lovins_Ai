import axios from 'axios'
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