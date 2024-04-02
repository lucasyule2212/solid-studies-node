import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gym/search-gym'

export function makeSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymUseCase(gymsRepository)

  return searchGymUseCase
}
