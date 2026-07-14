import { z } from 'zod'

export const connectTelegramSchema = z.object({
  botToken: z
    .string()
    .min(1, 'Bot token is required')
    .regex(/^\d+:[A-Za-z0-9_-]{35}$/, 'Invalid Telegram bot token format'),
})

export type ConnectTelegramInput = z.infer<typeof connectTelegramSchema>