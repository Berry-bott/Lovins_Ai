import { Router } from 'express'
import { connectTelegram, listConnections, getConnection, disconnectBot } from './telegram.controller'
import { authenticate } from '../../middleware/auth.middleware'

const router = Router()

router.use(authenticate)

router.post('/telegram', connectTelegram)
router.get('/', listConnections)
router.get('/:id', getConnection)
router.delete('/:id', disconnectBot)

export default router