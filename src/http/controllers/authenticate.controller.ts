import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
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
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, { sign: { sub: user.id } })

    // ? 200 - because this is a successful operation
    return reply.status(200).send(token)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      // ? 400 - because this operation is a bad request (invalid credentials)
      return reply.status(400).send({ message: error.message })
    }

    // ? 500 - because this is an unexpected error
    return reply.status(500).send()
  }
}
