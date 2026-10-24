import { Router } from 'express'
import authRoutes from './auth.routes'
import botConnectionRoutes from '../platforms/telegram/telegram.routes'
import { receiveTelegramUpdate } from '../platforms/telegram/telegram.controller'

const router = Router()

router.use('/auth', authRoutes)
// Telegram calls this endpoint directly; the controller verifies Telegram's webhook secret.
router.post('/webhooks/telegram/:id', receiveTelegramUpdate)
router.use('/bot-connections', botConnectionRoutes)

export default router
