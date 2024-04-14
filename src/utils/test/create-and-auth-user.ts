import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance) {
  // create the user
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'zxczxc',
  })

  // authenticate the user
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'zxczxc',
  })

  const { token } = authResponse.body

  return { token }
}
