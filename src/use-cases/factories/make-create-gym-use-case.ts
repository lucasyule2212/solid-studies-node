import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym/create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
