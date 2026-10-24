export interface TelegramCredentials {
  botToken: string
  botUsername?: string
  webhookSecret?: string
}

export interface TelegramUpdate {
  update_id: number
  message?: {
    message_id: number
    date: number
    text?: string
    chat: { id: number; type: string }
    from?: { id: number; is_bot: boolean; first_name?: string }
  }
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
