import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { refresh } from './refresh.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Refresh token route
  app.patch('/token/refresh', refresh)

  // Authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
