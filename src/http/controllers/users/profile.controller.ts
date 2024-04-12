import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfile = makeGetUserProfileUseCase()
    const { user } = await getUserProfile.execute({ id: request.user.sub })

    return reply.status(200).send({ user })
  } catch (error) {
    // ? 500 - because this is an unexpected error
    return reply.status(500).send()
  }
}
