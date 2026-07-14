export interface TelegramCredentials {
  botToken: string
  botUsername?: string
}

export interface TelegramBotInfo {
  id: number
  is_bot: boolean
  first_name: string
  username: string
}

export interface BotConnectionResponse {
  id: string
  platform: 'TELEGRAM'
  status: 'PENDING_TOKEN' | 'ACTIVE' | 'ERROR' | 'DISCONNECTED'
  credentials: {
    botUsername?: string
  }
  botpressBotId?: string
  createdAt: string
  updatedAt: string
}

export interface ConnectTelegramInput {
  botToken: string
}