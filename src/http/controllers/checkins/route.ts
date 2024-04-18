import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
import { validate } from './validate.controller'

export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/history', history)
  app.get('/checkins/metrics', metrics)

  app.post('/gyms/:gymId/checkins', create)
  app.patch(
    '/checkins/:checkinId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
