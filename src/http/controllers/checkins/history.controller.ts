import { makeFetchUsersCheckinsUseCase } from '@/use-cases/factories/make-fetch-users-checkins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryQuerySchema.parse(request.query)

  const fetchUserCheckins = makeFetchUsersCheckinsUseCase()

  const { checkIns } = await fetchUserCheckins.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
