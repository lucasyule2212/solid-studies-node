import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './services/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  // ? 201 - because this is a CREATE operation that does not return any data
  return reply.status(201).send()
})
