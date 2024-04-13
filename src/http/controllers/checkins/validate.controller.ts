import { makeValidateCheckinUseCase } from '@/use-cases/factories/make-validate-checkin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkinId: z.string(),
  })

  const { checkinId } = validateCheckinParamsSchema.parse(request.params)

  const validateCheckinUseCase = makeValidateCheckinUseCase()

  await validateCheckinUseCase.execute({
    checkinId,
  })

  // ? 204 - because this is a VALIDATE operation that does not return any data
  return reply.status(204).send()
}
