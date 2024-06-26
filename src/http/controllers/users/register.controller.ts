import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']),
  })

  const { name, email, password, role } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      role,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      // ? 409 - because this operation is a conflict (email already exists in the database)
      return reply.status(409).send({ message: error.message })
    }

    // ? 500 - because this is an unexpected error
    return reply.status(500).send()
  }

  // ? 201 - because this is a CREATE operation that does not return any data
  return reply.status(201).send()
}
