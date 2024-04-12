import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string().min(3),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.body)

  const searchQueryUseCase = makeSearchGymUseCase()

  const { gyms } = await searchQueryUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
