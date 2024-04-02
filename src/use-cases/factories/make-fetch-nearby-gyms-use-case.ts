import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymsUseCase
}
