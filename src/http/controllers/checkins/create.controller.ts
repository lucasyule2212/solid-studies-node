import { makeCheckinUseCase } from '@/use-cases/factories/make-checkin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckinParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckinBodySchema.parse(request.body)

  const createCheckinUseCase = makeCheckinUseCase()

  await createCheckinUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: request.user.sub,
  })

  // ? 201 - because this is a CREATE operation that does not return any data
  return reply.status(201).send()
}
