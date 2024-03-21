import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      // ? 400 - because this operation is a bad request (invalid credentials)
      return reply.status(400).send({ message: error.message })
    }

    // ? 500 - because this is an unexpected error
    return reply.status(500).send()
  }

  // ? 200 - because this is a successful operation
  return reply.status(200).send()
}
