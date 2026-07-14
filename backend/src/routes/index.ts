import { Router } from 'express'
import authRoutes from './auth.routes'
import botConnectionRoutes from '../platforms/telegram/telegram.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bot-connections', botConnectionRoutes)

export default router
